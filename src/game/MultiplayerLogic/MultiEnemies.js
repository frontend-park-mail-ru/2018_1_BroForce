'use strict';

import Enemy from '../SingleplayerLogic/Enemy.js';

export default class MultiEnemies extends Enemy {
    constructor(x, y, radius, context, colorArray) {
        super(x, y, 0, 0, radius, context, colorArray);
    }

    update(x, y) {
        this.enemyCoord.x = x;
        this.enemyCoord.y = y;

        this.draw();
    }
}
