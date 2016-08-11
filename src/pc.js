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
        dot: function ( x, y, a, color ) {
            context.save();
            context.translate( x + 20, y + 20 );
            context.rotate( a );
            context.beginPath();
            context.arc( 0, 0, 20, 0, 2 * Math.PI );
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
    engine.interval = 100;

    var ctx = getContext( 800, 600 );
    ctx.clear();

    var createShip = function ( x, y ) {
        var ship = new PC.Composite();

        var b1 = new PC.Body( new PC.Point( 0, 0 ) );
        b1.radius = 20;
        b1.mass = 10;
        ship.addBody( b1 );
        var b2 = new PC.Body( new PC.Point( 0, 40 ) );
        b1.radius = 20;
        b1.mass = 10;
        ship.addBody( b2 );
        var b3 = new PC.Body( new PC.Point( 0, 80 ) );
        b1.radius = 20;
        b1.mass = 10;
        ship.addBody( b3 );
        var b4 = new PC.Body( new PC.Point( 40, 80 ) );
        b1.radius = 20;
        b1.mass = 10;
        ship.addBody( b4 );

        ship.translate( new PC.Point( x, y ) );

        return ship;
    };

    var ship1 = createShip( 100, 100 );
    var ship2 = createShip( 200, 200 );
    var asteroid = new PC.Body( new PC.Point( 50, 50 ), 10 );
    asteroid.radius = 20;
    asteroid.mass = 100;
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
                    ctx.dot( body.position.x, body.position.y, body.angle, ( body.collided ) ? 'blue' : 'yellow' );
                }
            } else {
                ctx.dot( element.position.x, element.position.y, element.angle, ( element.collided ) ? 'blue' : 'yellow' );
            }
        }
    }, 32 );

    // just spin ship1
    ship1.applyForce( new PC.Vector( new PC.Point( 99, 100 ), new PC.Point( 99, 101 ) ) );

    // push ship2 into ship1
    ship2.applyForce( new PC.Vector( new PC.Point( 200, 200 ), new PC.Point( 195, 195 ) ) );

    // push ship2 into ship1
    asteroid.applyForce( new PC.Vector( new PC.Point( 50, 50 ), new PC.Point( 80, 80 ) ) );

    setTimeout( function () {
        console.log( 'The end.' );
        engine.stop();
        clearInterval( renderer );
    }, 12222 * 20000 );

} );
