'use strict';

import Player from '../game/Player.js';

export default class MultiUsers extends Player {
    constructor(x, y, radius, context, colorArray = ['white']) {
        super(x, y, 0, radius, context, colorArray);

        this.context = context;
        this.colorArray = colorArray;
    }

    update(x, y, radius) {
        this.userCoord.x = x;
        this.userCoord.y = y;
        this.userCoord.radius = radius;

        this.draw();
    };
}
