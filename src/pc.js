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
        dot: function ( x, y, a, color ) {
            context.save();
            context.translate( x + 10, y + 10 );
            context.rotate( a );
            context.beginPath();
            context.rect( -10, -10, 20, 20 );
            context.restore();
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'red';
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

    var ctx = getContext( 800, 600 );
    ctx.rect( 0, 400, 800, 1, 'red' );

    var b1 = new PC.Body( new PC.Point( 50, 200 ) );

    engine.addToWorld( b1 );

    engine.start();

    var renderer = setInterval( function () {
        var body;
        for ( var i = 0, world = engine.world, bodies = Object.keys( world ), l = bodies.length; i < l; i++ ) {
            body = world[ bodies[ i ] ];
            ctx.dot( body.position.x, body.position.y, body.angle, 'yellow' );
        }
    }, 32 );

    b1.applyForce( new PC.Vector( new PC.Point( 49, 200 ), new PC.Point( 49, 201 ) ) );

    setTimeout( function () {
        console.log( 'The end.' );
        engine.stop();
        clearInterval( renderer );
    }, 10000 );

} );
