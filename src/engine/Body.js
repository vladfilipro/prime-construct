'use strict';

var utils = require( './../libs/utils' );

var Point = require( './Point' );

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
    this.area = 1;
    this.damping = 0.01;
}

Body.prototype.updateAcceleration = function () {
    this.acceleration.x = utils.round( ( this.force.x - this.velocity.x * this.damping ) / this.mass, 4 );
    this.acceleration.y = utils.round( ( this.force.y - this.velocity.y * this.damping ) / this.mass, 4 );
    this.acceleration.angle = utils.round( ( this.torque - this.velocity.angle * this.damping ) / this.mass, 4 );
    this.torque = 0;
    this.force.x = 0;
    this.force.y = 0;
};

Body.prototype.updateVelocity = function () {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.angle += this.acceleration.angle;
};

Body.prototype.updateMovement = function () {
    this.position.x += utils.round( this.velocity.x, 2 );
    this.position.y += utils.round( this.velocity.y, 2 );
    this.angle += utils.round( this.velocity.angle, 2 );
};

Body.prototype.cycle = function () {
    this.updateAcceleration();
    this.updateVelocity();
    this.updateMovement();
};

Body.prototype.applyForce = function ( force ) {
    if ( !this.parent ) {
        var forceX = force.getLengthX();
        var forceY = force.getLengthY();
        this.torque = ( force.origin.x - this.position.x ) * forceY - ( force.origin.y - this.position.y ) * forceX;
        this.force.x = forceX;
        this.force.y = forceY;
    }
};

module.exports = Body;
