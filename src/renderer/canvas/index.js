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

    this.running = false;

}

Canvas.prototype.renderScene = function () {
    var self = this;
    backgroundRenderer( self.ctx );
    utils.forEach( this.engine.world.elements, function ( element ) {
        if ( element.bodies ) {
            utils.forEach( element.bodies, function ( body ) {
                bodyRenderer( self.ctx, body );
            } );
            bodyRenderer( self.ctx, element );
        } else {
            bodyRenderer( self.ctx, element );
        }
    } );
};

Canvas.prototype.init = function ( parent ) {
    parent = parent || document.body;

    var canvas = document.createElement( 'canvas' );
    parent.appendChild( canvas );
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    var ctx = canvas.getContext( '2d' );
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;

    this.parent = parent;
    this.canvas = canvas;
    this.ctx = ctx;
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
