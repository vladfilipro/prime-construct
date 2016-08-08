'use strict';

var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' ).create();

module.exports = function () {

    // Static server
    gulp.task( 'browser-sync', function () {
        browserSync.init( {
            files: './build/**/*',
            port: 8000,
            server: {
                baseDir: './build'
            }
        } );
    } );
};
