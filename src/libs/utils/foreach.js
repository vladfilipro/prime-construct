'use strict';

module.exports = function ( o, cb ) {
    for ( var i = 0, keys = Object.keys( o ), l = keys.length; i < l; i++ ) {
        cb( o[ keys[ i ] ], keys[ i ], i );
    }
};
