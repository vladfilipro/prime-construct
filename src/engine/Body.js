'use strict';

var utils = require( './../libs/utils' );

var Point = require( './Point' );

function Body( origin ) {

    this.position = origin;

    if ( !( this.position instanceof Point ) ) {
        throw 'Body has invalid constructor parameters';
    }

    this.parent = null;

    this.force = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };

    this.durability = 1;
    this.mass = 1;
    this.area = 25;
    this.damping = 0.01;
}

Body.prototype.collideY = function () {
    this.position.y = 400;
    this.velocity.y = 1 - this.velocity.y;
};

Body.prototype.updateAcceleration = function () {
    this.acceleration.x = utils.round( this.force.x / this.mass, 6 ) - utils.round( ( this.velocity.x * this.damping ), 4 );
    this.acceleration.y = utils.round( this.force.y / this.mass, 6 ) - utils.round( ( this.velocity.y * this.damping ), 4 );
    this.force.x = 0;
    this.force.y = 0;
};

Body.prototype.updateVelocity = function () {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
};

Body.prototype.updateMovement = function () {
    this.position.x += utils.round( this.velocity.x, 2 );
    this.position.y += utils.round( this.velocity.y, 2 );
};

Body.prototype.cycle = function () {
    this.updateAcceleration();
    this.updateVelocity();
    this.updateMovement();
};

// Not needed in 1 dimension body
Body.prototype.applyForce = function ( force ) {
    if ( !this.parent ) {
        force.translate( this.position );
        this.force.x = force.getLengthX();
        this.force.y = force.getLengthY();
    }
};

module.exports = Body;
