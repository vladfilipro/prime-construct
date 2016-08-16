'use strict';

var utils = require( './../libs/utils' );

var Vector = require( './Vector' );

function Body() {

    this.position = Vector.create();
    this.prevPosition = Vector.create();

    this.id = utils.uniqueId();
    this.parent = null;

    this.force = Vector.create();
    this.velocity = Vector.create();
    this.acceleration = Vector.create();

    this.angle = 0;
    this.prevAngle = 0;

    this.torque = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;

    this.mass = 1;
    this.area = 1;
    this.radius = 1;
    this.damping = 0.005;

    this.sleeping = true;
}

var approxZero = function ( value, margin ) {
    return Math.abs( value ) <= margin;
};

Body.prototype.update = function () {
    this.acceleration.x = ( this.force.x / this.mass ) - ( this.velocity.x * this.damping );
    this.acceleration.y = ( this.force.y / this.mass ) - ( this.velocity.y * this.damping );
    this.angularAcceleration = ( this.torque / this.mass ) - ( this.angularVelocity * this.damping );

    this.velocity = Vector.add( this.velocity, this.acceleration );
    this.angularVelocity += this.angularAcceleration;

    this.prevPosition = this.position;
    this.position = Vector.add( this.position, this.velocity );

    this.angle = this.angle % ( 2 * Math.PI ); // Prevent exceeding of numeric limit
    this.prevAngle = this.angle;
    this.angle += this.angularVelocity;

    // Come to full stop when approching 0 angular speed
    this.angularVelocity = ( Math.abs( this.angularVelocity ) < 0.0001 && Math.abs( this.angularAcceleration ) <= 0.00001 ) ? 0 : this.angularVelocity;

    this.force.x = 0;
    this.force.y = 0;
    this.torque = 0;

    if ( approxZero( Vector.magnitude( this.velocity ), 0.0001 ) && approxZero( Vector.magnitude( this.acceleration ), 0.00001 ) &&
        approxZero( this.angularVelocity, 0.0001 ) && approxZero( this.angularAcceleration, 0.00001 ) ) {

        // Bring body to a full stop
        this.sleeping = true;
    }
};

Body.prototype.setPosition = function ( point ) {
    var diff = Vector.sub( point, this.position );
    this.prevPosition = Vector.add( this.prevPosition, diff );
    this.position = point;
    return this;
};

Body.prototype.rotate = function ( angle ) {
    this.prevAngle += angle - this.angle;
    this.angle = angle;
    return this;
};

Body.prototype.cycle = function () {
    this.update();
    return this;
};

Body.prototype.applyForce = function ( force, origin ) {
    origin = origin || this.position;
    this.force = Vector.add( this.force, force );
    var offset = Vector.sub( origin, this.position );
    this.torque += ( offset.x * force.y - offset.y * force.x ) / ( this.area * 10 );
    this.sleeping = false;
    return this;
};

Body.prototype.checkCollision = function ( body ) {

    if ( !( this.parent && body.parent && this.parent.id === body.parent.id ) ) {
        var diff = Vector.sub( this.position, body.position );
        var distance = Vector.magnitude( diff );
        var overlap = distance - ( this.radius + body.radius );

        if ( overlap < 0 ) {
            var factor = overlap / distance * 0.5;

            var body1 = this.parent || this;
            var body2 = body.parent || body;

            body1.applyForce( Vector.multiply( Vector.invert( diff ), factor * body2.mass / body1.mass ), this.position );
            body2.applyForce( Vector.multiply( diff, factor * body1.mass / body2.mass ), body.position );

            return true;
        }
    }

    return false;
};

Body.prototype.on = function () {
    console.log( 'Activated: ', this.id );
};
Body.prototype.off = function () {
    console.log( 'Deactivated: ', this.id );
};

module.exports = Body;
