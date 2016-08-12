'use strict';

var PC = require( './engine' );

window.PC = window.PC || PC;

var getContext = function ( w, h ) {
    var canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );
    var context = canvas.getContext( '2d' );
    context.canvas.width = w;
    context.canvas.height = h;
    return {
        clear: function () {
            context.beginPath();
            context.rect( 0, 0, w, h );
            context.fillStyle = 'rgba(40,40,40,1.0)';
            context.fill();

        },
        dot: function ( x, y, r, color ) {
            context.save();
            context.translate( x, y );
            context.beginPath();
            context.arc( 0, 0, r, 0, 2 * Math.PI );
            context.fillStyle = color;
            context.fill();
            context.beginPath();
            context.arc( 0, 0, 1, 0, 2 * Math.PI );
            context.fillStyle = '#FF0000';
            context.fill();
            context.restore();
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
    engine.interval = 16;

    var ctx = getContext( 800, 600 );
    ctx.clear();

    var createShip = function ( x, y ) {
        var ship = new PC.Composite();

        var b1 = new PC.Body( new PC.Point( 0, 0 ) );
        b1.radius = 10;
        b1.mass = 10;
        ship.addBody( b1 );
        var b2 = new PC.Body( new PC.Point( 0, 20 ) );
        b2.radius = 10;
        b2.mass = 10;
        ship.addBody( b2 );
        var b3 = new PC.Body( new PC.Point( 0, 40 ) );
        b3.radius = 10;
        b3.mass = 10;
        ship.addBody( b3 );
        var b4 = new PC.Body( new PC.Point( 20, 40 ) );
        b4.radius = 10;
        b4.mass = 10;
        ship.addBody( b4 );

        ship.translate( new PC.Point( x, y ) );

        return ship;
    };

    var ship1 = createShip( 100, 100 );
    var ship2 = createShip( 200, 200 );
    var asteroid = new PC.Body( new PC.Point( 50, 50 ), 10 );
    asteroid.radius = 10;
    asteroid.mass = 10;
    asteroid.id = 0;

    engine.world
        .add( ship1 )
        .add( ship2 )
        .add( asteroid );

    engine.start();

    var renderer = setInterval( function () {
        ctx.clear();
        ctx.rect( 0, 400, 800, 1, 'red' );

        var element;
        var body;
        for ( var i = 0, elements = engine.world.elements, elementsNames = Object.keys( elements ), il = elementsNames.length; i < il; i++ ) {
            element = elements[ elementsNames[ i ] ];
            if ( element instanceof PC.Composite ) {
                for ( var j = 0, bodies = element.bodies, bodiesNames = Object.keys( bodies ), jl = bodiesNames.length; j < jl; j++ ) {
                    body = bodies[ bodiesNames[ j ] ];
                    ctx.dot( body.position.x, body.position.y, body.radius, ( body.collided ) ? 'blue' : 'yellow' );
                }
            } else {
                ctx.dot( element.position.x, element.position.y, element.radius, ( element.collided ) ? 'blue' : 'yellow' );
            }
        }
    }, 32 );

    // just spin ship1
    ship1.applyForce( new PC.Vector( new PC.Point( 99, 100 ), new PC.Point( 99, 105 ) ) );

    // push ship2 into ship1
    ship2.applyForce( new PC.Vector( new PC.Point( 200, 200 ), new PC.Point( 190, 190 ) ) );

    // push asteroid
    asteroid.applyForce( new PC.Vector( new PC.Point( 50, 50 ), new PC.Point( 70, 70 ) ) );

    setTimeout( function () {
        console.log( 'The end.' );
        engine.stop();
        clearInterval( renderer );
    }, 12222 * 20000 );

} );
