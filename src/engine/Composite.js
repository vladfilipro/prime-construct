'use strict';

var utils = require( './../libs/utils' );

var Body = require( './Body' );
var Vector = require( './Vector' );

// Extends Body class
function Composite() {

    // Constructor
    Body.call( this );

    this.bodies = {};
    delete this.radius;
}

Composite.prototype = Object.create( Body.prototype );
Composite.prototype.constructor = Composite;

// Updates object mass, durability and center of mass
Composite.prototype.updateStructure = function () {
    var mass = 0;
    var area = 0;
    var durability = 0;

    var origin = Vector.create();

    utils.forEach( this.bodies, function ( body ) {
        origin.x += body.position.x * body.mass;
        origin.y += body.position.y * body.mass;
        mass += body.mass;
        area += body.area;
        durability += body.durability;
    } );

    origin.x = origin.x / mass;
    origin.y = origin.y / mass;

    this.position = origin;
    this.mass = mass;
    this.area = area;
    this.durability = durability;
    return this;
};

Composite.prototype.update = function () {
    Body.prototype.update.call( this );

    var self = this;

    // Manipulate bodies
    utils.forEach( this.bodies, function ( body ) {
        body.prevPosition = body.position;
        body.position = Vector.add( body.position, self.velocity );
        body.prevAngle = body.angle;
        body.angle += self.angularVelocity;
        body.position = Vector.rotate( body.position, self.angularVelocity, self.position );
    } );
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
    var diff = Vector.sub( point, this.position );
    utils.forEach( this.bodies, function ( body ) {
        body.position = Vector.add( body.position, diff );
        body.prevPosition = Vector.sub( body.position, body.velocity );
    } );
    this.prevPosition = Vector.add( this.prevPosition, diff );
    this.position = point;
    return this;
};

Composite.prototype.rotate = function ( angle ) {
    var diff = angle - this.angle;
    utils.forEach( this.bodies, function ( body ) {
        body.angle += diff;
        body.prevAngle = Vector.sub( body.angle, body.angularVelocity );
    } );
    this.prevAngle += diff;
    this.angle = angle;
    return this;
};

module.exports = Composite;
