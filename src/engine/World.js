'use strict';

var utils = require( './../libs/utils' );

function World() {
    var self = this;

    this.elements = {};

    var bodies = {};

    var explodeElements = function () {
        bodies = {};

        var addCompositeParts = function ( composite ) {
            var body;
            Object.keys( composite.bodies ).map( function ( e ) {
                body = composite.bodies[ e ];
                bodies[ body.id ] = body;
            } );
        };

        utils.forEach( self.elements, function ( element ) {
            if ( element.bodies && Object.keys( element.bodies ).length > 0 ) {
                addCompositeParts( element );
            } else {
                bodies[ element.id ] = element;
            }
        } );

    };

    this.add = function ( body ) {
        this.elements[ body.id ] = body;
        explodeElements();
        return this;
    };
    this.remove = function ( body ) {
        delete this.elements[ body.id ];
        explodeElements();
        return this;
    };

    this.checkCollisions = function () {
        var keys = Object.keys( bodies ),
            l = keys.length;

        for ( var i = 0; i < l; i++ ) {
            for ( var j = i + 1; j < l; j++ ) {
                bodies[ keys[ i ] ].checkCollision( bodies[ keys[ j ] ] );
            }
        }
    };
}

World.prototype.cycle = function () {
    utils.forEach( this.elements, function ( element ) {
        if ( !element.sleeping ) {
            element.cycle();
        }
    } );
    this.checkCollisions();
};

module.exports = World;
