'use strict';

var create = function ( x, y ) {
    x = x || 0;
    y = y || 0;

    if ( !( ( typeof x === 'number' ) && ( typeof y === 'number' ) ) ) {
        throw 'Vector requires X,Y constructor arguments to be numbers';
    }

    return {
        x: x,
        y: y
    };
};

var translate = function ( vector, x, y ) {
    return create( x, y );
};

var rotate = function ( vector, angle, center ) {
    var cos = Math.cos( angle ),
        sin = Math.sin( angle );
    center = center || {
        x: 0,
        y: 0
    };
    var x = center.x + ( ( vector.x - center.x ) * cos - ( vector.y - center.y ) * sin );
    var y = center.y + ( ( vector.x - center.x ) * sin + ( vector.y - center.y ) * cos );
    return create( x, y );
};

var magnitude = function ( vector ) {
    return Math.sqrt( ( vector.x * vector.x ) + ( vector.y * vector.y ) );
};

var angle = function ( vector, vector2 ) {
    return Math.atan2( vector2.y - vector.y, vector2.x - vector.x );
};

var add = function ( vector, vector2 ) {
    return create( vector.x + vector2.x, vector.y + vector2.y );
};

var sub = function ( vector, vector2 ) {
    return create( vector.x - vector2.x, vector.y - vector2.y );
};

var multiply = function ( vector, value ) {
    return create( vector.x * value, vector.y * value );
};

var divide = function ( vector, value ) {
    return create( vector.x / value, vector.y / value );
};

var perpendicular = function ( vector, invert ) {
    invert = invert === true ? -1 : 1;
    var x = invert * -vector.y;
    var y = invert * vector.x;
    return create( x, y );
};

var invert = function ( vector ) {
    return create( -vector.x, -vector.y );
};

module.exports = {
    create: create,
    translate: translate,
    rotate: rotate,
    magnitude: magnitude,
    angle: angle,
    add: add,
    sub: sub,
    multiply: multiply,
    divide: divide,
    perpendicular: perpendicular,
    invert: invert
};
