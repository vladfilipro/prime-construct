'use strict';

var renderers = {
    canvas: require( './../renderer/canvas' )
};

module.exports = function ( name ) {
    return renderers[ name ];
};
