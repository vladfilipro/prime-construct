'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );

require( './browser-sync' )();

gulp.task( 'build', function ( callback ) {
    runSequence( 'clean-build',
        'copy-index',
        'compile',
        callback );
} );

gulp.task( 'test', function ( callback ) {
    runSequence( 'build',
        'watch',
        'browser-sync',
        callback );
} );

module.exports = {
    rigs: [ 'rig-javascript' ],
    commands: {
        'init': {
            taskname: 'rig-javascript__install-rig',
            path: './'
        },
        'lint-jscs': {
            taskname: 'rig-javascript__jscs',
            src: [ './spec/**/*.js', './src/**/*.js' ]
        },
        'lint-jshint': {
            taskname: 'rig-javascript__jshint',
            src: [ './spec/**/*.js', './src/**/*.js' ]
        },
        'clean-build': {
            taskname: 'core__clean',
            path: './build'
        },
        'copy-index': {
            taskname: 'core__copy',
            src: './src/index.html',
            dest: './build'
        },
        'compile': {
            taskname: 'rig-javascript__browserify',
            dependency: [ 'lint-jscs', 'lint-jshint' ],
            src: './src/pce.js',
            output: 'pce.js',
            sourcemap: true,
            dest: './build',
            debug: true,
            minify: false
        },
        'watch': {
            taskname: 'core__watch',
            watchers: [ {
                src: './src/index.html',
                tasks: [ 'copy-index' ]
            }, {
                src: [ './src/**/*.js' ],
                tasks: [ 'compile' ]
            } ]
        }
    }
};
