'use strict';

var Point = require( './Point' );

function Body( origin, size ) {

    this.origin = origin;
    this.size = size;

    if ( !( ( this.origin instanceof Point ) && ( typeof this.size === 'number' ) ) ) {
        throw 'Body has invalid constructor parameters';
    }

    this.parent = null;

    this.velocity = {
        x: 0,
        y: 0
    };
    this.force = {
        x: 0,
        y: 0
    };

    this.durability = 1;
    this.mass = 10;
    this.area = 1;
    this.friction = 0.1;
}

Body.prototype.cycle = function () {
    var prevVelocityX = this.velocity.x;
    var prevVelocityY = this.velocity.y;
    this.velocity.x = prevVelocityX * ( 1 - this.friction ) + this.force.x / this.mass;
    this.velocity.y = prevVelocityY * ( 1 - this.friction ) + this.force.y / this.mass;
    console.log( this.velocity );
};

Body.prototype.applyForce = function ( force ) {
    if ( !this.parent ) {
        this.force.x = force.breakdown().x;
        this.force.y = force.breakdown().y;

        // body.force.x += force.x;
        // body.force.y += force.y;
        // var offset = {
        //     x: position.x - body.position.x,
        //     y: position.y - body.position.y
        // };
        // body.torque += offset.x * force.y - offset.y * force.x;
    }
};

module.exports = Body;
