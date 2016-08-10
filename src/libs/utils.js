'use strict';

module.exports = {
    uniqueId: function () {
        return ( new Date() ).getTime() + '' + Math.floor( Math.random() * 10000000 );
    },
    capitalize: function ( str ) {
        return str[ 0 ].toUpperCase() + str.substring( 1, str.length );
    },
    forEach: function ( o, cb ) {
        for ( var i = 0, keys = Object.keys( o ), l = keys.length; i < l; i++ ) {
            cb( o[ keys[ i ] ], keys[ i ], i );
        }
    },
    round: function ( number, precision ) {
        var factor = Math.pow( 10, precision );
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round( tempNumber );
        return roundedTempNumber / factor;
    }

};
