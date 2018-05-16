'use strict';

import Player from '../game/Player.js';

export default class multiUsers extends Player {
    constructor(x, y, radius, context, colorArray = ['white']) {
        super(x, y, 0, radius, context, colorArray);

        this.context = context;
        this.colorArray = colorArray;

        this.userCoord = {
            x: x,
            y: y,
            radius: radius,
        };
    }

    update(x, y, radius) {
        this.userCoord.x = x;
        this.userCoord.y = y;
        this.userCoord.radius = radius;

        this.draw();
    };
}
