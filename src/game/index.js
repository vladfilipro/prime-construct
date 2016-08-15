'use strict';

var renderers = {
    canvas: require( './../renderer/canvas' )
};

module.exports = {
    Engine: require( './../engine' ),
    blocks: require( './factoryBlock' )(),
    ships: require( './factoryShip' )(),
    renderer: function ( name ) {
        return renderers[ name ];
    }
};
