'use strict';

var PC = require( './engine' );

window.PC = window.PC || PC;

document.addEventListener( 'DOMContentLoaded', function () {
    var engine = new PC.Engine();
    engine.interval = 100;

    var b1 = new PC.Body( new PC.Point(), 10 );

    engine.bodies.push( b1 );
    engine.start();
    setTimeout( function () {
        engine.stop();
    }, 2000 );

    b1.applyForce( new PC.Vector( null, new PC.Point( 10, 10 ) ) );
} );
