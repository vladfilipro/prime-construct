'use strict';

function Point( x, y ) {
    this.x = x || 0;
    this.y = y || 0;

    if ( !( ( typeof this.x === 'number' ) && ( typeof this.y === 'number' ) ) ) {
        throw 'Point requires X,Y constructor arguments to be numbers';
    }
}
module.exports = Point;
