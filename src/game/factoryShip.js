'use strict';

var Composite = require( './../engine/Composite' );

module.exports = function () {

    return {
        create: function () {
            var ship = new Composite();
            return ship;
        }
    };

};
