'use strict';

var Body = require( './Body' );
var Vector = require( './Vector' );

// Extends Body class
function Composite() {

    // Constructor
    Body.call( this, new Vector() );

    this.bodies = {};
    delete this.radius;
}

Composite.prototype = Object.create( Body.prototype );
Composite.prototype.constructor = Composite;

// Updates object mass, durability and center of mass
Composite.prototype.updateStructure = function () {
    var mass = 0;
    var durability = 0;

    var origin = new Vector();

    var body;
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        origin.x += body.position.x * body.mass;
        origin.y += body.position.y * body.mass;
        mass += body.mass;
        durability += body.durability;
    }

    origin.x = origin.x / mass;
    origin.y = origin.y / mass;

    this.position = origin;
    this.mass = mass;
    this.durability = durability;
    return this;
};

Composite.prototype.addBody = function ( body ) {
    body.parent = this;
    this.bodies[ body.id ] = body;
    this.updateStructure();
    return this;
};

Composite.prototype.removeBody = function ( body ) {
    delete this.bodies[ body.id ];
    this.updateStructure();
    return this;
};

Composite.prototype.setPosition = function ( point ) {
    var body;
    var diff = Vector.sub( point, this.position );
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        body.position = Vector.add( body.position, diff );

        // TO BE CONTINUED! From here to bot, fix vectors
        body.prevPosition.add( diff.clone().invert() );
    }
    this.prevPosition.add( diff );
    this.position = point;
    return this;
};

Composite.prototype.rotate = function ( angle ) {
    var body;
    for ( var i = 0, bodies = Object.keys( this.bodies ), l = bodies.length; i < l; i++ ) {
        body = this.bodies[ bodies[ i ] ];
        body.angle += angle - body.angle;
        body.position.rotate( this.prevAngle + ( body.angle - angle ) );
    }
    this.prevAngle = angle;
    this.angle = angle;
    return this;
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
    return this;
};

module.exports = Composite;
