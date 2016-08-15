'use strict';

var Body = require( './../../engine/Body' );

function Block() {

    // Constructor
    Body.call( this );

    this.durability = 1;
    this.radius = 10;

}

Block.prototype = Object.create( Body.prototype );
Block.prototype.constructor = Block;

module.exports = Block;
