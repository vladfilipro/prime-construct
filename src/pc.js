'use strict';

var PC = require( './engine' );

window.PC = window.PC || PC;

var getContext = function ( w, h ) {
    var canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );
    var context = canvas.getContext( '2d' );
    context.canvas.width = w;
    context.canvas.height = h;
    context.fillStyle = 'rgba(40,40,40,1.0)';
    context.fillRect( 0, 0, canvas.width, canvas.height );
    return {
        dot: function ( x, y, color ) {
            context.beginPath();
            context.rect( x, y, 5, 5 );
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
        },
        rect: function ( x, y, w, h, color ) {
            context.beginPath();
            context.rect( x, y, w, h );
            context.fillStyle = color;
            context.fill();
        }
    };
};

document.addEventListener( 'DOMContentLoaded', function () {
    var engine = new PC.Engine();

    var b1 = new PC.Body( new PC.Point( 50, 200 ) );

    var ctx = getContext( 800, 600 );
    ctx.rect( 0, 400, 800, 1, 'red' );

    engine.bodies.push( b1 );

    engine.start();

    var renderer = setInterval( function () {
        var data = engine.render();
        var bodyPosition;
        for ( var i = 0, l = data.length; i < l; i++ ) {
            bodyPosition = data[ i ].position;
            ctx.dot( bodyPosition.x, bodyPosition.y, 'yellow' );
            if ( bodyPosition.y >= 400 ) {
                data[ i ].collideY();
            }
        }
    }, 32 );

    b1.applyForce( new PC.Vector( null, new PC.Point( 1, 1 ) ) );

    setTimeout( function () {
        console.log( 'The end.' );
        engine.stop();
        clearInterval( renderer );
    }, 10000 );

} );
