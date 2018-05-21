'use strict';

export default class Enemy {
    constructor(x, y, dx, dy, radius, context, colorArray = ['white']) {
        this.dx = dx;
        this.dy = dy;
        this.context = context;
        this.colorArray = colorArray;

        this.enemyCoord = {
            x: x,
            y: y,
            radius: radius,
        };
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.enemyCoord.x, this.enemyCoord.y, this.enemyCoord.radius, 0, Math.PI * 2, false);

        const gradient = this.context.createRadialGradient(this.enemyCoord.x, this.enemyCoord.y, 0,
            this.enemyCoord.x, this.enemyCoord.y, this.enemyCoord.radius);
        gradient.addColorStop(0, this.colorArray[3]);
        gradient.addColorStop(0.5, this.colorArray[3]);
        gradient.addColorStop(1, 'rgba(250,76,43,0)');

        this.context.fillStyle = gradient;
        this.context.fill();
    };

    update() {
        if (this.enemyCoord.x + this.enemyCoord.radius > innerWidth || this.enemyCoord.x - this.enemyCoord.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.enemyCoord.y + this.enemyCoord.radius > innerHeight || this.enemyCoord.y - this.enemyCoord.radius < 0) {
            this.dy = - this.dy;
        }

        this.enemyCoord.x += this.dx;
        this.enemyCoord.y += this.dy;

        this.draw();
    };

    getEnemyCoord() {
        return this.enemyCoord;
    }
}
