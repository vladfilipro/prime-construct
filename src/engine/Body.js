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
    this.damping = 0.1;
}

Body.prototype.update = function () {
    this.acceleration.x = ( this.force.x - this.velocity.x * this.damping ) / this.mass;
    this.acceleration.y = ( this.force.y - this.velocity.y * this.damping ) / this.mass;
    this.angularAcceleration = ( this.torque - this.angularVelocity * this.damping ) / this.mass;

    this.velocity = Vector.add( this.velocity, this.acceleration );
    this.angularVelocity += this.angularAcceleration;

    this.prevPosition = this.position;
    this.position = Vector.add( this.position, this.velocity );

    this.prevAngle = this.angle;
    this.angle += this.angularVelocity;

    // Come to full stop when approching 0 speed
    this.velocity.x = ( this.velocity.x < 0.01 && Math.abs( this.acceleration.x ) <= 0.001 ) ? 0 : this.velocity.x;
    this.velocity.y = ( this.velocity.y < 0.01 && Math.abs( this.acceleration.y ) <= 0.001 ) ? 0 : this.velocity.y;
    this.angularVelocity = ( this.angularVelocity < 0.0001 && Math.abs( this.angularAcceleration ) <= 0.00001 ) ? 0 : this.angularVelocity;

    this.force.x = 0;
    this.force.y = 0;
    this.torque = 0;
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
    this.torque = ( offset.x * force.y - offset.y * force.x ) / this.area;
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

            body1.applyForce( Vector.create( -diff.x * factor, -diff.y * factor ), this.position );
            body2.applyForce( Vector.create( diff.x * factor, diff.y * factor ), body.position );

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
