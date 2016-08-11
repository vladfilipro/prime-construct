'use strict';

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

        var element;
        for ( var i = 0, keys = Object.keys( self.elements ), l = keys.length; i < l; i++ ) {
            element = self.elements[ keys[ i ] ];
            if ( element.bodies && Object.keys( element.bodies ).length > 0 ) {
                addCompositeParts( element );
            } else {
                bodies[ element.id ] = element;
            }
        }
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
                bodies[ keys[ i ] ].collidedWith( bodies[ keys[ j ] ] );
            }
        }
    };
}

World.prototype.cycle = function () {
    for ( var i = 0, keys = Object.keys( this.elements ), l = keys.length; i < l; i++ ) {
        this.elements[ keys[ i ] ].cycle();
    }
    this.checkCollisions();
};

module.exports = World;
