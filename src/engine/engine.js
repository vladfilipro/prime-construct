'use strict';

var World = require( './World' );

function Engine() {

    this.running = false;
    this.interval = 16;

    this.world = new World();
}

Engine.prototype.start = function () {
    var self = this;
    this.running = true;

    var loop = function () {
        setTimeout( function () {
            self.world.cycle();
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
