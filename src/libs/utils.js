'use strict';

module.exports = {
    capitalize: function ( str ) {
        return str[ 0 ].toUpperCase() + str.substring( 1, str.length );
    },
    forEach: function ( o, cb ) {
        for ( var i = 0, keys = Object.keys( o ), l = keys.length; i < l; i++ ) {
            cb( o[ keys[ i ] ], keys[ i ], i );
        }
    }

};
