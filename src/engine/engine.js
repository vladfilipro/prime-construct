'use strict';

function Engine() {
    this.interval = 1;
    this.cycleId = 0;

    this.bodies = [];

    this.world = {};
}

Engine.prototype.cycle = function () {
    for ( var i = 0; i < this.bodies.length; i++ ) {
        this.bodies[ i ].cycle();
    }
};

Engine.prototype.start = function () {
    var self = this;
    var loop = function () {
        self.cycleId = setTimeout( function () {
            self.cycle();
            loop();
        }, self.interval );
    };
    loop();
};

Engine.prototype.stop = function () {
    clearTimeout( this.cycleId );
    this.cycleId = 0;
};

module.exports = Engine;
