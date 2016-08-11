'use strict';

//var utils = require( './../libs/utils' );

var Body = require( './Body' );
var Point = require( './Point' );

// Extends Body class
function Composite() {

    // Constructor
    Body.call( this, new Point() );

    this.bodies = {};
}

Composite.prototype = Object.create( Body.prototype );
Composite.prototype.constructor = Composite;

// Updates object mass, area, durability and center of mass
Composite.prototype.update = function () {
    var mass = 0;
    var area = 0;
    var durability = 0;

    var origin = new Point();

    var body;
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        origin.x += body.position.x * body.mass;
        origin.y += body.position.y * body.mass;
        mass += body.mass;
        area += body.area;
        durability += body.durability;
    }

    origin.x = origin.x / mass;
    origin.y = origin.y / mass;

    this.position = origin;
    this.area = area;
    this.mass = mass;
    this.durability = durability;
};

Composite.prototype.addBody = function ( body ) {
    body.parent = this;
    this.bodies[ body.id ] = body;
    this.update();
};

Composite.prototype.removeBody = function ( body ) {
    delete this.bodies[ body.id ];
    this.update();
};

Composite.prototype.translate = function ( destination ) {
    var body;

    // Translate all bodies
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        body.position.x += destination.x - this.position.x;
        body.position.y += destination.y - this.position.y;
    }

    this.position = destination.clone();
};

Composite.prototype.updateMovement = function () {
    Body.prototype.updateMovement.call( this );
    var body;
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        body.position.x += this.velocity.x;
        body.position.y += this.velocity.y;
        body.angle = this.angle;
        body.position.rotate( this.position, this.velocity.angle );
    }
};

module.exports = Composite;
