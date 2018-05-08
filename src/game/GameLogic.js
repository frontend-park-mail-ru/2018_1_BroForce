'use strict';

import PlayerNew from './Player.js';
import Enemy from './Enemy.js';

export default class GameLogic {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');

        this.MAX_ENEMY_RADIUS = 100;
        this.ENEMIES_COUNT = 30;
        this.USER_RADIUS = 30;
        this.animationId = null;
        this.colorArray = ['#fa4c2b', '#6aff6e', '#ffff82', '#ffce72', '#fa4c2b', '#0bfcff'];
        this.divineShield = true;
        setTimeout((()=> this.divineShield = false), 3000);

        this.keyW = false;
        this.keyA = false;
        this.keyS = false;
        this.keyD = false;
    }

    Start() {
        const gameText = document.querySelector('.game-win');
        gameText.innerHTML = "";

        this.eventResize = window.addEventListener('resize', function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.eventKeyDown = document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 87 || 38:
                    this.keyW = true;
                    break;
                case 65 || 37:
                    this.keyA = true;
                    break;
                case 83 || 40:
                    this.keyS = true;
                    break;
                case 68 || 39:
                    this.keyD = true;
                    break;

                case 38:
                    this.keyW = true;
                    break;
                case 37:
                    this.keyA = true;
                    break;
                case 40:
                    this.keyS = true;
                    break;
                case 39:
                    this.keyD = true;
                    break;
                default:
                    break;
            }
        });

        this.eventKeyUp = document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 87 || 38:
                    this.keyW = false;
                    break;
                case 65 || 37:
                    this.keyA = false;
                    break;
                case 83 || 40:
                    this.keyS = false;
                    break;
                case 68 || 39:
                    this.keyD = false;
                    break;

                case 38:
                    this.keyW = false;
                    break;
                case 37:
                    this.keyA = false;
                    break;
                case 40:
                    this.keyS = false;
                    break;
                case 39:
                    this.keyD = false;
                    break;
                default:
                    break;
            }
        });

        const enemyArray = [];
        const player = new PlayerNew(innerWidth / 2, innerHeight / 2, 2, this.USER_RADIUS, this.context, this.colorArray);

        const initEnemies = () => {
            for (let i = 0; i < this.ENEMIES_COUNT; i++) {
                const radius = Math.random() * 50 + 5;
                const x = Math.random() * (innerWidth - radius * 2) + radius;
                const y = Math.random() * (innerHeight - radius * 2) + radius;
                const dx = (Math.random() - 0.5);
                const dy = (Math.random() - 0.5);

                enemyArray.push(new Enemy(x, y, dx, dy, radius, this.context, this.colorArray));
            }
        };

        const animate = () => {
            // User lose
            if (player.getUserCoords().radius <= 0) {
                player.getUserCoords().radius = 0;
                cancelAnimationFrame(this.animationId);
                this.Start();
                const score = document.querySelector('p[name=gameScore]');
                score.innerHTML = "0";
                return
            }
            this.animationId = requestAnimationFrame(animate);
            this.context.clearRect(0, 0, innerWidth, innerHeight);
            player.update(this.keyW, this.keyS, this.keyA, this.keyD);

            const eatenEnemies = [];
            const eatenEnemiesRadius = [];

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
                        eatenEnemiesRadius.push(enemyArray[i].getEnemyCoord().radius);
                    } else {
                        //If user lose
                        if (this.divineShield === false) {
                            player.getUserCoords().radius = 0;
                            cancelAnimationFrame(this.animationId);
                            this.Start();
                            const score = document.querySelector('p[name=gameScore]');
                            score.innerHTML = "0";
                            return
                        }
                    }
                }
            }
            if (eatenEnemies.length !== 0) {
                eatenEnemies.forEach((item) => {
                    enemyArray.splice(item, 1);
                });
                eatenEnemiesRadius.forEach((item) => {
                    if (player.getUserCoords().radius + item <= this.MAX_ENEMY_RADIUS) {
                        player.getUserCoords().radius += item;
                    } else {
                        player.getUserCoords().radius = this.MAX_ENEMY_RADIUS;
                    }
                });
            }
            //If user win
            if (enemyArray.length === 0) {
                cancelAnimationFrame(this.animationId);
                const gameText = document.querySelector('.game-win');
                // gameText.innerHTML = "You win";
            }
        };

        initEnemies();
        animate();
    }

    Stop() {
        cancelAnimationFrame(this.animationId);
        document.removeEventListener("resize", this.eventResize, false);
        document.removeEventListener("keydown", this.eventKeyDown, false);
        document.removeEventListener("keyup", this.eventKeyUp, false);
    }
}

