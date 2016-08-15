'use strict';

var Block = require( './default' );

function BlockHull() {

    // Constructor
    Block.call( this );

    this.type = 'hull';

    this.durability = 100;
    this.mass = 100;

}

BlockHull.prototype = Object.create( Block.prototype );
BlockHull.prototype.constructor = BlockHull;

module.exports = BlockHull;
