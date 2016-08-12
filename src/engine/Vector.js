'use strict';

var Point = require( './Point' );

function Vector( originPoint, destinationPoint ) {
    this.origin = originPoint || new Point();
    this.destination = destinationPoint || new Point();

    if ( !( ( this.origin instanceof Point ) && ( this.destination instanceof Point ) ) ) {
        throw 'Vector requires an instance of Point';
    }
}

Vector.prototype.distance = function () {
    return Math.sqrt(
        Math.pow( ( this.destination.x - this.origin.x ), 2 ) +
        Math.pow( ( this.destination.y - this.origin.y ), 2 )
    );
};

Vector.prototype.angle = function () {
    return Math.atan2( this.destination.y - this.origin.y, this.destination.x - this.origin.x );
};

Vector.prototype.rotate = function ( angle ) {
    var cos = Math.cos( angle ),
        sin = Math.sin( angle );
    var x = this.destination.x - this.origin.x;
    var y = this.destination.y - this.origin.y;
    this.destination.x = this.origin.x + ( x * cos - y * sin );
    this.destination.y = this.origin.y + ( x * sin + y * cos );
    return this;
};

Vector.prototype.translate = function ( point ) {
    var x = this.destination.x - this.origin.x;
    var y = this.destination.y - this.origin.y;
    this.origin.x = point.x;
    this.origin.y = point.y;
    this.destination.x = point.x + x;
    this.destination.y = point.y + y;
    return this;
};

Vector.prototype.multiply = function ( value ) {
    this.destination.x = this.origin.x + ( this.destination.x - this.origin.x ) * value;
    this.destination.y = this.origin.y + ( this.destination.y - this.origin.y ) * value;
    return this;
};

Vector.prototype.invert = function () {
    var x = this.origin.x;
    var y = this.origin.y;
    this.origin.x = this.destination.x;
    this.origin.y = this.destination.y;
    this.destination.x = x;
    this.destination.y = y;
    return this;
};

Vector.prototype.getLengthX = function () {
    return this.destination.x - this.origin.x;
};

Vector.prototype.getLengthY = function () {
    return this.destination.y - this.origin.y;
};

Vector.prototype.clone = function () {
    return new Vector( this.origin.clone(), this.destination.clone() );
};

module.exports = Vector;
