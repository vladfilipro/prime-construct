'use strict';

module.exports = function ( ctx, body ) {
    var config = {
        x: body.position.x || 0,
        y: body.position.y || 0,
        angle: body.angle || 0,
        radius: body.radius || 0,
        color: ( body.type === 'thruster' ) ? '#FF0000' : '#00FF00'
    };

    ctx.save();
    ctx.translate( config.x, config.y );
    ctx.rotate( config.angle );
    ctx.beginPath();
    ctx.arc( 0, 0, config.radius, -Math.PI * 1 / 4, Math.PI + Math.PI * 1 / 4 );
    ctx.fillStyle = config.color;
    ctx.fill();
    ctx.restore();
};
