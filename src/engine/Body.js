'use strict';

var utils = require( './../libs/utils' );

var Point = require( './Point' );
var Vector = require( './Vector' );

function Body( origin ) {

    this.position = origin;
    this.angle = 0;

    if ( !( this.position instanceof Point ) ) {
        throw 'Body has invalid constructor parameters';
    }

    this.id = utils.uniqueId();
    this.parent = null;

    this.force = {
        x: 0,
        y: 0
    };
    this.torque = 0;
    this.acceleration = {
        x: 0,
        y: 0,
        rotate: 0
    };
    this.velocity = {
        x: 0,
        y: 0,
        angle: 0
    };

    this.durability = 1;
    this.mass = 1;
    this.radius = 1;
    this.damping = 0.01;
}

Body.prototype.updateAcceleration = function () {
    if ( !this.parent ) {
        this.acceleration.x = utils.round( ( this.force.x - this.velocity.x * this.damping ) / this.mass, 4 );
        this.acceleration.y = utils.round( ( this.force.y - this.velocity.y * this.damping ) / this.mass, 4 );

        //( angle is a bit more sensitive )
        this.acceleration.angle = utils.round( ( this.torque - this.velocity.angle * this.damping ) / this.mass, 6 );
        this.torque = 0;
        this.force.x = 0;
        this.force.y = 0;
    }
    return this;
};

Body.prototype.updateVelocity = function () {
    if ( !this.parent ) {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.angle += this.acceleration.angle;

        // Come to full stop when approching 0 speed
        this.velocity.x = ( this.velocity.x < 0.1 && this.acceleration.x === 0 ) ? 0 : this.velocity.x;
        this.velocity.y = ( this.velocity.y < 0.1 && this.acceleration.y === 0 ) ? 0 : this.velocity.y;
        this.velocity.angle = ( this.velocity.angle < 0.0001 && this.acceleration.angle === 0 ) ? 0 : this.velocity.angle;
    }
    return this;
};

Body.prototype.updateMovement = function () {
    if ( !this.parent ) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.angle += this.velocity.angle;
    }
    return this;
};

Body.prototype.cycle = function () {
    if ( !this.parent ) {
        this.updateAcceleration();
        this.updateVelocity();
        this.updateMovement();
    }
    return this;
};

Body.prototype.translate = function ( destination ) {
    this.position = destination;
    return this;
};

Body.prototype.stop = function () {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.rotate = 0;
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    this.acceleration.rotate = 0;
    return this;
};

Body.prototype.applyForce = function ( force ) {
    if ( !this.parent ) {
        var forceX = force.getLengthX();
        var forceY = force.getLengthY();
        this.torque = ( force.origin.x - this.position.x ) * forceY - ( force.origin.y - this.position.y ) * forceX;
        this.force.x = forceX;
        this.force.y = forceY;
    }
    return this;
};

Body.prototype.collidedWith = function ( body ) {
    if ( !( this.parent && body.parent && this.parent.id === body.parent.id ) ) {
        var vector = new Vector( this.position, body.position );
        var distance = vector.distance();
        var overlap = ( this.radius + body.radius ) - distance;

        if ( overlap > 0 ) {

            // TO BE REMOVED!
            this.collided = true;
            body.collided = true;

            var target = ( this.parent || this );

            var velocity = new Vector( this.position.clone(), new Point( this.position.x + this.velocity.x, this.position.y + this.velocity.y ) );
            velocity
                .rotate( Math.PI + 2 * vector.angle() - velocity.angle() );

            //target.translate( new Point( 2 * target.position.x - this.position.x, 2 * target.position.y - this.position.y ) );
            target.applyForce( velocity );

            return true;
        }
    }

    return false;
};

module.exports = Body;
