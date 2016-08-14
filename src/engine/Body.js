'use strict';

var utils = require( './../libs/utils' );

var Vector = require( './Vector' );

function Body( origin ) {

    origin = origin || Vector.create( 0, 0 );

    if ( !( ( typeof origin.x === 'number' ) && ( typeof origin.y === 'number' ) ) ) {
        throw 'Vector requires X,Y constructor arguments to be numbers';
    }

    this.position = origin;
    this.prevPosition = origin;

    this.id = utils.uniqueId();
    this.parent = null;

    this.force = Vector.create();
    this.velocity = Vector.create();

    this.torque = 0;
    this.angle = 0;
    this.prevAngle = 0;

    this.angularVelocity = 0;

    this.durability = 1;
    this.mass = 1;
    this.radius = 1;
    this.damping = 0.01;
}

Body.prototype.update = function () {
    var prevVelocityX = this.position.x - this.prevPosition.x;
    var prevVelocityY = this.position.y - this.prevPosition.y;

    this.velocity.x = ( prevVelocityX * this.damping ) + ( this.force.x / this.mass );
    this.velocity.y = ( prevVelocityY * this.damping ) + ( this.force.y / this.mass );

    this.prevPosition = this.position;
    this.position = Vector.create( this.position.x + this.velocity.x, this.position.y + this.velocity.y );

    this.angularVelocity = ( ( this.angle - this.prevAngle ) * this.damping ) + ( this.torque / this.mass );

    this.prevAngle = this.angle;
    this.angle += this.angularVelocity;

    // Manipulate bodies
    var body;
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        body.prevPosition = body.position;
        body.position = Vector.create( body.position.x + this.velocity.x, body.position.y + this.velocity.y );
        body.prevAngle = body.angle;
        body.angle = body.angle + this.angularVelocity;
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
    this.force = Vector.add( this.force, force );
    var offset = Vector.sub( origin, this.position );
    this.torque += offset.x * force.y - offset.y * force.x;
    return this;
};

Body.prototype.collidedWith = function () {

    // if ( !( this.parent && body.parent && this.parent.id === body.parent.id ) ) {
    //     var vector = new Vector( this.position, body.position );
    //     var distance = vector.distance();
    //     var overlap = ( this.radius + body.radius ) - distance;
    //
    //     if ( overlap > 0 ) {
    //
    //         // TO BE REMOVED!
    //         this.collided = true;
    //         body.collided = true;
    //
    //         return true;
    //     }
    // }
    //
    //return false;
};

module.exports = Body;
