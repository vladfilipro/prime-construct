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
        dot: function ( x, y, r, a, color ) {
            context.save();
            context.translate( x, y );
            context.rotate( a );
            context.beginPath();
            context.arc( 0, 0, r, 0, 1.5 * Math.PI );
            context.fillStyle = color;
            context.fill();
            context.beginPath();
            context.arc( 0, 0, 1, 0, 1.5 * Math.PI );
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

        var b1 = new PC.Body();
        b1.radius = 10;
        b1.mass = 10;
        b1.area = 10;
        ship.addBody( b1 );
        var b2 = new PC.Body( PC.Vector.create( 0, 20 ) );
        b2.radius = 10;
        b2.mass = 10;
        b2.area = 10;
        ship.addBody( b2 );
        var b3 = new PC.Body( PC.Vector.create( 0, 40 ) );
        b3.radius = 10;
        b3.mass = 10;
        b3.area = 10;
        ship.addBody( b3 );
        var b4 = new PC.Body( PC.Vector.create( 20, 40 ) );
        b4.radius = 10;
        b4.mass = 10;
        b4.area = 10;
        ship.addBody( b4 );

        ship.setPosition( PC.Vector.create( x, y ) );

        return ship;
    };

    var ship1 = createShip( 300, 300 );
    var asteroid = new PC.Body( PC.Vector.create( 50, 50 ) );
    asteroid.radius = 10;
    asteroid.mass = 5;
    asteroid.id = 0;

    engine.world
        .add( ship1 )
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
                    ctx.dot( body.position.x, body.position.y, body.radius, body.angle, ( body.collided ) ? 'blue' : 'yellow' );
                }
            } else {
                ctx.dot( element.position.x, element.position.y, element.radius, element.angle, ( element.collided ) ? 'blue' : 'yellow' );
            }
        }
    }, 32 );

    // just spin ship1
    ship1.applyForce( PC.Vector.create( -30, -30 ), PC.Vector.create( 300, 290 ) );

    // push asteroid
    asteroid.applyForce( PC.Vector.create( 15, 15 ), PC.Vector.create( 50, 49 ) );

    setTimeout( function () {
        console.log( 'The end.' );
        engine.stop();
        clearInterval( renderer );
    }, 12222 * 20000 );

} );
