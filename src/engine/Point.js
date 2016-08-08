'use strict';

function Point( coords ) {
    this.x = ( coords && coords.x ) ? coords.x : 0;
    this.y = ( coords && coords.y ) ? coords.y : 0;
}

module.exports = Point;
