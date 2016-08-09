'use strict';

var now = function () {
    return ( new Date() ).getTime();
};

function Timeline() {

    this.startTime = 0;

}

Timeline.protoype.start = function () {
    this.startTime = now();
};
Timeline.protoype.elapsed = function () {
    return now() - this.startTime;
};

Timeline.prototype.cycle = function () {

};

module.exports = Timeline;
