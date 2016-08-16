'use strict';

var COLORS = {
    'thruster': '#FFFF00',
    'hull': '#00FF00'
};

module.exports = function ( ctx, camera ) {

    return function ( body ) {

        ctx.save();
        ctx.translate( body.position.x - camera.x, body.position.y - camera.y );
        ctx.rotate( body.angle );

        // Draw body
        ( function () {
            ctx.beginPath();
            ctx.arc( 0, 0, body.radius, 1 / 6 * Math.PI, -1 / 6 * Math.PI );
            ctx.lineWidth = 2;
            ctx.strokeStyle = ( !body.sleeping ) ? ( ( body.type ) ? COLORS[ body.type ] : '#FFFF00' ) : '#CCC';
            ctx.stroke();
        } )();

        // Draw center
        ( function () {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#FF0000';
            ctx.moveTo( -2, -2 );
            ctx.lineTo( 2, 2 );
            ctx.moveTo( -2, 2 );
            ctx.lineTo( 2, -2 );
            ctx.stroke();
        } )();

        ctx.restore();

        ctx.save();
        ctx.translate( body.position.x - camera.x, body.position.y - camera.y );

        // Draw velocity
        ( function () {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#FF9999';
            ctx.moveTo( 0, 0 );
            ctx.lineTo( body.force.x, body.force.y );
            ctx.stroke();
        } )();

        ctx.restore();

        if ( !body.parent ) {
            ctx.save();
            ctx.translate( body.position.x - camera.x, body.position.y - camera.y );

            // Draw velocity
            ( function () {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#FFFFFF';
                ctx.moveTo( 0, 0 );
                ctx.lineTo( body.velocity.x * 100, body.velocity.y * 100 );
                ctx.stroke();
            } )();

            ctx.restore();
        }

    };
};
