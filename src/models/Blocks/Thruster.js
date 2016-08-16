'use strict';

var Vector = require( './../../engine/Vector' );
var Block = require( './default' );

function BlockThruster() {

    // Constructor
    Block.call( this );

    this.type = 'thruster';

    this.durability = 50;
    this.mass = 200;
    this.thrust = 10;

}

BlockThruster.prototype = Object.create( Block.prototype );
BlockThruster.prototype.constructor = BlockThruster;

BlockThruster.prototype.on = function () {
    this.active = true;
    var target = this.parent || this;
    var force = Vector.rotate( Vector.create( this.thrust, 0 ), this.angle );
    target.applyForce( force, this.position );
};

module.exports = BlockThruster;
