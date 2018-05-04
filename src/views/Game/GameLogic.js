'use strict';

import PlayerNew from './Player.js'
import Enemy from './Enemy.js'

export default class GameLogic {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.MAX_ENEMY_RADIUS = 100;
        this.ENEMIES_COUNT = 30;
        this.USER_RADIUS = 30;
        this.USER_NEON_LIGHT = 40;
        this.animationId = null;

        this.divineShield = true;
        setTimeout((()=> this.divineShield = false), 3000);
    }

    Start() {
        const context = this.canvas.getContext('2d');

        let enemyArray = [];
        const colorArray = ['#fa4c2b', '#6aff6e', '#ffff82', '#ffce72', '#fa4c2b', '#0bfcff'];

        let mouse = {
            x: undefined,
            y: undefined,
        };

        let keyW = false;
        let keyA = false;
        let keyS = false;
        let keyD = false;

        window.addEventListener('resize', function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        document.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 87 || 38:
                    console.log('up');
                    keyW = true;
                    break;
                case 65 || 37:
                    keyA = true;
                    break;
                case 83 || 40:
                    keyS = true;
                    break;
                case 68 || 39:
                    keyD = true;
                    break;

                case 38:
                    keyW = true;
                    break;
                case 37:
                    keyA = true;
                    break;
                case 40:
                    keyS = true;
                    break;
                case 39:
                    keyD = true;
                    break;
                default:
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 87 || 38:
                    keyW = false;
                    break;
                case 65 || 37:
                    keyA = false;
                    break;
                case 83 || 40:
                    keyS = false;
                    break;
                case 68 || 39:
                    keyD = false;
                    break;

                case 38:
                    keyW = false;
                    break;
                case 37:
                    keyA = false;
                    break;
                case 40:
                    keyS = false;
                    break;
                case 39:
                    keyD = false;
                    break;
                default:
                    break;
            }
        });

        const initEnemies = () => {
            for (let i = 0; i < this.ENEMIES_COUNT; i++) {
                let radius = Math.random() * 50 + 5;
                const x = Math.random() * (innerWidth - radius * 2) + radius;
                const y = Math.random() * (innerHeight - radius * 2) + radius;
                const dx = (Math.random() - 0.5);
                const dy = (Math.random() - 0.5);

                enemyArray.push(new Enemy(x, y, dx, dy, radius, context, colorArray));
            }
        };

        const player = new PlayerNew(innerWidth / 2, innerHeight / 2, 2, this.USER_RADIUS, context, colorArray);
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            context.clearRect(0, 0, innerWidth, innerHeight);
            player.update(keyW, keyS, keyA, keyD);

            let eatenEnemies = [];
            let eatenEnemiesRadiuses = [];

            for (let i = 0; i < enemyArray.length; i++) {
                enemyArray[i].update();

                // Eating
                const distance = Math.sqrt(Math.pow((enemyArray[i].getEnemyCoord().x - player.getUserCoords().x), 2)
                    + Math.pow((enemyArray[i].getEnemyCoord().y - player.getUserCoords().y), 2));
                if (distance < player.getUserCoords().radius / 3 + enemyArray[i].getEnemyCoord().radius) {
                    if (player.getUserCoords().radius > enemyArray[i].getEnemyCoord().radius) {
                        const score = document.querySelector('p[name=gameScore]');
                        score.innerHTML = (+score.innerHTML + Math.round(enemyArray[i].getEnemyCoord().radius)).toString();
                        eatenEnemies.push(i);
                        eatenEnemiesRadiuses.push(enemyArray[i].getEnemyCoord().radius);
                    } else {
                        if (this.divineShield === false) {
                            player.getUserCoords().radius = 0;
                            cancelAnimationFrame(this.animationId);
                        }
                    }
                }
            }

            if (eatenEnemies.length !== 0) {
                eatenEnemies.forEach((item) => {
                    enemyArray.splice(item, 1);
                });
                eatenEnemiesRadiuses.forEach((item) => {
                    if (player.getUserCoords().radius + item <= this.MAX_ENEMY_RADIUS) {
                        player.getUserCoords().radius += item;
                    } else {
                        player.getUserCoords().radius = this.MAX_ENEMY_RADIUS;
                    }
                });
            }

            if (enemyArray.length === 0) {
                console.log('You Win!');
            }
        };

        initEnemies();
        animate();
    }

    Stop() {
        cancelAnimationFrame(this.animationId);
    }
}
