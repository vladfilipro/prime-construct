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
