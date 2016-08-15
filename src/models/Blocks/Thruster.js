'use strict';

var Vector = require( './../../engine/Vector' );
var Block = require( './default' );

function BlockThruster() {

    // Constructor
    Block.call( this );

    this.type = 'thruster';

    this.durability = 50;
    this.thrust = Vector.create( 0, 1 );

}

BlockThruster.prototype = Object.create( Block.prototype );
BlockThruster.prototype.constructor = BlockThruster;

BlockThruster.prototype.on = function () {
    var target = this.parent || this;
    console.log( Vector.rotate( this.thrust, this.angle ) );
    target.applyForce( Vector.rotate( this.thrust, this.angle ), this.position );
};

module.exports = BlockThruster;
