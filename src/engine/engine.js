'use strict';

function Engine() {

    this.running = false;
    this.interval = 16;

    this.bodies = [];

    this.world = {};
}

Engine.prototype.render = function () {
    return this.bodies;
};

Engine.prototype.cycle = function () {
    for ( var i = 0; i < this.bodies.length; i++ ) {
        this.bodies[ i ].cycle();
    }
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
