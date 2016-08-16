'use strict';

var utils = require( './../../libs/utils' );

var backgroundRenderer = require( './background' );
var bodyRenderer = require( './body' );

function Canvas( engine ) {
    this.parent = document.body;
    this.canvas = null;
    this.ctx = null;
    this.interval = 16;
    this.engine = engine;

    this.renderers = {
        background: null,
        body: null
    };

    this.camera = {
        x: 0,
        y: 0,
        attachedTo: null
    };

    this.running = false;

}

Canvas.prototype.cameraMove = function ( x, y ) {
    this.camera.x = x;
    this.camera.y = y;
};

Canvas.prototype.cameraAttachTo = function ( body ) {
    this.camera.attachedTo = body;
};

Canvas.prototype.renderScene = function () {
    var self = this;

    // Resize to fit screen
    self.resize();

    // Position camera to attached body , if exists in the world
    if ( self.camera.attachedTo && self.engine.world.elements[ self.camera.attachedTo.id ] ) {
        self.cameraMove( self.camera.attachedTo.position.x - self.ctx.canvas.width / 2, self.camera.attachedTo.position.y - self.ctx.canvas.height / 2 );
    }

    // Render background
    self.renderers.background();
    utils.forEach( self.engine.world.elements, function ( element ) {
        if ( element.bodies ) {
            utils.forEach( element.bodies, function ( body ) {
                self.renderers.body( body );
            } );
            self.renderers.body( element );
        } else {
            self.renderers.body( element );
        }
    } );
};

Canvas.prototype.resize = function () {
    this.ctx.canvas.width = this.canvas.clientWidth;
    this.ctx.canvas.height = this.canvas.clientHeight;
};

Canvas.prototype.init = function ( parent ) {
    parent = parent || document.body;

    var canvas = document.createElement( 'canvas' );
    parent.appendChild( canvas );
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    var ctx = canvas.getContext( '2d' );

    this.parent = parent;
    this.canvas = canvas;
    this.ctx = ctx;

    this.renderers.background = backgroundRenderer( ctx );
    this.renderers.body = bodyRenderer( ctx, this.camera );

    this.resize();
};

Canvas.prototype.start = function () {
    this.running = true;
    var self = this;
    var cycle = function () {
        setTimeout( function () {
            self.renderScene();
            if ( self.running ) {
                cycle();
            }
        }, self.interval );
    };
    cycle();
};

Canvas.prototype.stop = function () {
    this.running = false;
};

Canvas.prototype.destroy = function () {
    this.stop();
    this.parent.removeChild( this.canvas );
};

module.exports = Canvas;
