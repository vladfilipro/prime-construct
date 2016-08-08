'use strict';

var Point = require( './Point' );

function Body( origin, size ) {

    this.origin = origin;
    this.size = size;

    if ( ( this.origin instanceof Point ) && ( typeof this.size === 'number' ) ) {
        throw 'Body has invalid constructor parameters';
    }

    this.durability = 1;
    this.mass = 1;
    this.friction = 0.1;
}

module.exports = Body;
