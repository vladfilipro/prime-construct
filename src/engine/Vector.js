'use strict';

var Point = require( './Point' );

function Vector( origin, destination ) {
    this.originPoint = origin;
    this.destinationPoint = destination;

    if ( ( this.originPoint instanceof Point ) && ( this.destinationPoint instanceof Point ) ) {
        throw 'Vector requires an instance of Point';
    }

}

Point.prototype.getDistance = function () {
    return Math.sqrt(
        ( this.destinationPoint.x - this.originPoint.x ) ^ 2 +
        ( this.destinationPoint.y - this.originPoint.y ) ^ 2
    );
};

module.exports = Vector;
