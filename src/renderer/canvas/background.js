'use strict';

module.exports = function ( ctx ) {
    ctx.beginPath();
    ctx.rect( 0, 0, ctx.canvas.width, ctx.canvas.height );
    ctx.fillStyle = '#000';
    ctx.fill();
};
