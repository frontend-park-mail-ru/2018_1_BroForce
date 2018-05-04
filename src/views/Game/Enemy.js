'use strict';

export default class Enemy {
    constructor(x, y, dx, dy, radius, context, colorArray = ['white']) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.context = context;
        this.colorArray = colorArray;

        this.enemyCoord = {
            x: this.x,
            y: this.y,
            radius: this.radius,
        };
    }

    draw () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        const gradient = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.colorArray[3]);
        gradient.addColorStop(0.5, this.colorArray[3]);
        gradient.addColorStop(1, 'rgba(250,76,43,0)');

        this.context.fillStyle = gradient;
        this.context.fill();
    };

    update() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = - this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.enemyCoord.x = this.x;
        this.enemyCoord.y = this.y;
        this.enemyCoord.radius = this.radius;

        this.draw();
    };

    getEnemyCoord() {
        return this.enemyCoord
    }
}