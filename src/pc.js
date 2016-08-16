'use strict';

var PC = require( './game' );

window.PC = window.PC || PC;

var getShip = function ( blocks, ships ) {
    var ship = ships.create();

    var block1 = blocks.create( 'hull' );
    var block2 = blocks.create( 'thruster' );
    var block3 = blocks.create( 'hull' );
    var block4 = blocks.create( 'thruster' );
    var block5 = blocks.create( 'hull' );
    var block6 = blocks.create( 'thruster' );
    var block7 = blocks.create( 'hull' );
    var block8 = blocks.create( 'thruster' );
    var block9 = blocks.create( 'hull' );

    ( function () {
        block1.setPosition( {
            x: 0,
            y: 0
        } );
        block2.setPosition( {
            x: 20,
            y: 0
        } );
        block2.rotate( Math.PI / 2 );
        block2.thrust = 50;
        block3.setPosition( {
            x: 40,
            y: 0
        } );
        block4.setPosition( {
            x: 60,
            y: 0
        } );
        block4.rotate( Math.PI / 2 );
        block4.thrust = 50;
        block5.setPosition( {
            x: 80,
            y: 0
        } );
        block6.setPosition( {
            x: 20,
            y: 20
        } );
        block6.rotate( Math.PI );
        block7.setPosition( {
            x: 40,
            y: 20
        } );
        block8.setPosition( {
            x: 60,
            y: 20
        } );
        block8.rotate( 0 );
        block9.setPosition( {
            x: 40,
            y: 40
        } );
        ship
            .addBody( block6 )
            .addBody( block7 )
            .addBody( block8 )
            .addBody( block1 )
            .addBody( block2 )
            .addBody( block3 )
            .addBody( block4 )
            .addBody( block5 )
            .addBody( block9 );
    } )();

    var bindKeys = function () {
        var keys = {};
        document.onkeydown = function ( e ) {
            keys[ e.code ] = true;
        };
        document.onkeyup = function ( e ) {
            keys[ e.code ] = false;
        };
        setInterval( function () {
            if ( keys.KeyW ) {
                block2.on();
                block4.on();
            }
            if ( keys.KeyD ) {
                block6.on();
            }
            if ( keys.KeyA ) {
                block8.on();
            }
        }, 100 );
    };
    bindKeys();

    return ship;
};

var asteroid = function ( blocks ) {
    var block = blocks.create( 'hull' );

    var getRandom = function ( min, max ) {
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };

    block.setPosition( {
        x: Math.floor( getRandom( 0, 1000 ) ),
        y: Math.floor( getRandom( 0, 1000 ) )
    } );

    return block;
};

document.addEventListener( 'DOMContentLoaded', function () {
    var engine = new PC.Engine();
    var CanvasRenderer = PC.renderer( 'canvas' );
    var renderer = new CanvasRenderer( engine );

    engine.start();

    var ship = getShip( PC.blocks, PC.ships );
    ship.setPosition( {
        x: 200,
        y: 200
    } );

    for ( var i = 0; i < 100; i++ ) {
        engine.world.add( asteroid( PC.blocks ) );
    }

    engine.world.add( ship );

    renderer.init();
    renderer.cameraAttachTo( ship );
    renderer.start();

} );
