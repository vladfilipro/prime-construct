'use strict';

function Point( x, y ) {
    this.x = x || 0;
    this.y = y || 0;

    if ( !( ( typeof this.x === 'number' ) && ( typeof this.y === 'number' ) ) ) {
        throw 'Point requires X,Y constructor arguments to be numbers';
    }
}

Point.prototype.set = function ( point ) {
    this.x = point.x;
    this.y = point.y;
    return this;
};

Point.prototype.clone = function () {
    return new Point( this.x, this.y );
};

module.exports = Point;
