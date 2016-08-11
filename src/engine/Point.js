'use strict';

function Point( x, y ) {
    this.x = x || 0;
    this.y = y || 0;

    if ( !( ( typeof this.x === 'number' ) && ( typeof this.y === 'number' ) ) ) {
        throw 'Point requires X,Y constructor arguments to be numbers';
    }
}

Point.prototype.translate = function ( point ) {
    this.x = point.x;
    this.y = point.y;
    return this;
};

Point.prototype.rotate = function ( point, angle ) {
    var cos = Math.cos( angle );
    var sin = Math.sin( angle );
    var newPosition = {
        x: point.x + ( ( this.x - point.x ) * cos - ( this.y - point.y ) * sin ),
        y: point.y + ( ( this.x - point.x ) * sin + ( this.y - point.y ) * cos )
    };
    this.x = newPosition.x;
    this.y = newPosition.y;
};

Point.prototype.clone = function () {
    return new Point( this.x, this.y );
};

module.exports = Point;
