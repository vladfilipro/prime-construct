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

Vector.prototype.translate = function ( destination ) {
    this.destination.x += destination.x - this.origin.x;
    this.destination.y += destination.y - this.origin.y;
    this.origin = destination;
    return this;
};

Vector.prototype.breakdown = function () {
    return {
        x: this.destination.x - this.origin.x,
        y: this.destination.y - this.origin.y
    };
};

module.exports = Vector;
