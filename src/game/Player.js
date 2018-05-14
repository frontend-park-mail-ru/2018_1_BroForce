'use strict';

export default class Player {
    constructor(x, y, speed, radius, context, colorArray = ['white']) {
        this.context = context;
        this.colorArray = colorArray;

        this.userCoord = {
            x: x,
            y: y,
            radius: radius,
            speed: speed,
        };
    }

    draw() {
        this.context.save();
        this.context.beginPath();

        const gradient = this.context.createRadialGradient(this.userCoord.x, this.userCoord.y,
            0, this.userCoord.x, this.userCoord.y, this.userCoord.radius);
        gradient.addColorStop(0, this.colorArray[4]);
        gradient.addColorStop(0.5, this.colorArray[5]);
        gradient.addColorStop(1, 'rgba(250,76,43,0)');

        this.context.arc(this.userCoord.x, this.userCoord.y, this.userCoord.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = gradient;
        this.context.fill();
        this.context.closePath();
    };

    update(keyW, keyS, keyA, keyD) {
        const borderLeft = this.userCoord.x - this.userCoord.radius / 1.3 >= 0;
        const borderRight = this.userCoord.x + this.userCoord.radius / 1.3 <= innerWidth;
        const borderUp = this.userCoord.y - this.userCoord.radius / 1.3 > 0;
        const borderDown = this.userCoord.y + this.userCoord.radius / 1.3 < innerHeight;

        if (keyA === true && borderLeft) {
            this.userCoord.x -= this.userCoord.speed;
            this.userCoord.radius -= 0.1;
        }
        if (keyD === true && borderRight) {
            this.userCoord.x += this.userCoord.speed;
            this.userCoord.radius -= 0.1;
        }
        if (keyW === true && borderUp) {
            this.userCoord.y -= this.userCoord.speed;
            this.userCoord.radius -= 0.1;
        }
        if (keyS === true && borderDown) {
            this.userCoord.y += this.userCoord.speed;
            this.userCoord.radius -= 0.1;
        }
        if (keyW === false && keyD === false && keyA === false && keyD === false) {
            this.userCoord.radius -= 0.02;
        }

        this.draw();
    };

    getUserCoords() {
        return this.userCoord;
    }
}
