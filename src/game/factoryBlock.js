'use strict';

var MODELS = {
    hull: require( './../models/Blocks/Hull' ),
    thruster: require( './../models/Blocks/Thruster' )
};

module.exports = function () {

    var getBlockConstructor = function ( Model ) {

        function Block() {
            Model.call( this );
        }

        Block.prototype = Object.create( Model.prototype );
        Block.prototype.constructor = Block;

        return Block;
    };

    return {
        create: function ( modelName ) {
            modelName = modelName || 'hull';
            var Block = getBlockConstructor( MODELS[ modelName ] );
            return new Block();
        }
    };

};
