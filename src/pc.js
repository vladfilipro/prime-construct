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

    var ship = new PC.Composite();

    ship.addBody( new PC.Body( new PC.Point( 0, 0 ) ) );
    ship.addBody( new PC.Body( new PC.Point( 0, 20 ) ) );
    ship.addBody( new PC.Body( new PC.Point( 0, 40 ) ) );
    ship.addBody( new PC.Body( new PC.Point( 20, 40 ) ) );

    ship.translate( new PC.Point( 100, 100 ) );

    engine.addToWorld( ship );

    engine.start();

    var renderer = setInterval( function () {
        var entity;
        var body;
        for ( var i = 0, world = engine.world, bodies = Object.keys( world ), l = bodies.length; i < l; i++ ) {
            entity = world[ bodies[ i ] ];
            for ( var j = 0, pieces = entity.bodies, ids = Object.keys( pieces ), jl = ids.length; j < jl; j++ ) {
                body = pieces[ ids[ j ] ];
                ctx.dot( body.position.x, body.position.y, body.angle, 'yellow' );
            }
        }
    }, 32 );

    ship.applyForce( new PC.Vector( new PC.Point( 101, 100 ), new PC.Point( 101, 100.1 ) ) );

    setTimeout( function () {
        console.log( 'Moving ship...' );
        ship.translate( new PC.Point( 150, 150 ) );
    }, 2000 );

    setTimeout( function () {
        console.log( 'Adding body part...' );
        ship.addBody( new PC.Body( new PC.Point( 100, 100 ) ) );
        ship.translate( new PC.Point( 150, 150 ) );
    }, 2000 );

    setTimeout( function () {
        console.log( 'The end.' );
        engine.stop();
        clearInterval( renderer );
    }, 12222 * 20000 );

} );
