'use strict';

module.exports = {
    Engine: require( './../engine' ),
    blocks: require( './factoryBlock' )(),
    ships: require( './factoryShip' )(),
    renderer: require( './../renderer' )
};
