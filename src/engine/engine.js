'use strict';

function Engine() {

    this.running = false;
    this.interval = 16;

    this.world = {};
}

Engine.prototype.cycle = function () {
    for ( var i = 0, keys = Object.keys( this.world ), l = keys.length; i < l; i++ ) {
        this.world[ keys[ i ] ].cycle();
    }
};

Engine.prototype.addToWorld = function ( body ) {
    this.world[ body.id ] = body;
};

Engine.prototype.start = function () {
    var self = this;
    this.running = true;

    var loop = function () {
        setTimeout( function () {
            self.cycle();
            if ( self.running ) {
                loop();
            }
        }, self.interval );
    };
    loop();
};

Engine.prototype.stop = function () {
    this.running = false;
};

module.exports = Engine;
