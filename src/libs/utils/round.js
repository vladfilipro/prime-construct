'use strict';

module.exports = function ( number, precision ) {
    var factor = Math.pow( 10, precision );
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round( tempNumber );
    return roundedTempNumber / factor;
};
