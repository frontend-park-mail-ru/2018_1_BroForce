'use strict';

import PlayerNew from './Player.js';
import Enemy from './Enemy.js';

export default class GameLogic {
    constructor() {
        this.canvas = document.querySelector('.game-page__canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');

        this.MAX_USER_RADIUS = 100;
        this.MAX_ENEMY_RADIUS = 50;
        this.ENEMIES_COUNT = 30;
        this.USER_RADIUS = 30;
        this.animationId = null;
        this.colorArray = ['#fa4c2b', '#6aff6e', '#ffff82', '#ffce72', '#fa4c2b', '#0bfcff'];
        this.enemyArray = [];
        this.userWin = false;
        this.divineShield = true;
    }

    Start() {
        this.keyW = false;
        this.keyA = false;
        this.keyS = false;
        this.keyD = false;
        this.enemies = this.ENEMIES_COUNT;

        this.divineShield = true;
        setTimeout((()=> this.divineShield = false), 2000);
        let windowResize = false;
        this.score = 0;

        const player = new PlayerNew(innerWidth / 2, innerHeight / 2, 2, this.USER_RADIUS, this.context, this.colorArray);

        const initEnemies = () => {
            for (let i = 0; i < this.ENEMIES_COUNT; i++) {
                const radius = Math.random() * this.MAX_ENEMY_RADIUS + 5;
                const x = Math.random() * (innerWidth - radius * 2) + radius;
                const y = Math.random() * (innerHeight - radius * 2) + radius;
                const dx = (Math.random() - 0.5);
                const dy = (Math.random() - 0.5);

                this.enemyArray.push(new Enemy(x, y, dx, dy, radius, this.context, this.colorArray));
            }
        };

        this.eventResize = window.addEventListener('resize', function() {
            let canvas = document.querySelector('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            windowResize = true;
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

        this.eventMouseDown = document.addEventListener('touchstart', (event) => {
            const x = event.touches[0].clientX;
            const y = event.touches[0].clientY;

            if (x < player.getUserCoords().x) {
                this.keyD = true;
                setTimeout((()=> this.keyD = false), 100);
            } else if (x > player.getUserCoords().x) {
                this.keyA = true;
                setTimeout((()=> this.keyA = false), 100);
            }
            if (y > player.getUserCoords().y) {
                this.keyW = true;
                setTimeout((()=> this.keyW = false), 100);
            } else if (y < player.getUserCoords().y) {
                this.keyS = true;
                setTimeout((()=> this.keyS = false), 100);
            }
        });

        const animate = () => {
            if (windowResize === true) {
                console.log('resize');
                this.Restart();
                windowResize = false;
                const score = document.querySelector('p[name=gameScore]');
                score.innerHTML = '0';
            }

            if (player.getUserCoords().radius <= 0.5) {
                console.log('Radius kek');
                this.Restart();
                return;
            }
            this.animationId = requestAnimationFrame(animate);
            this.context.clearRect(0, 0, innerWidth, innerHeight);
            player.update(this.keyW, this.keyS, this.keyA, this.keyD);

            const eatenEnemies = [];
            const eatenEnemiesRadius = [];

            for (let i = 0; i < this.enemyArray.length; i++) {
                this.enemyArray[i].update();

                const distance = Math.sqrt(Math.pow((this.enemyArray[i].getEnemyCoord().x - player.getUserCoords().x), 2)
                    + Math.pow((this.enemyArray[i].getEnemyCoord().y - player.getUserCoords().y), 2));
                if (distance < player.getUserCoords().radius / 3 + this.enemyArray[i].getEnemyCoord().radius) {
                    if (player.getUserCoords().radius > this.enemyArray[i].getEnemyCoord().radius) {
                        const score = document.querySelector('p[name=gameScore]');
                        this.score += Math.round(this.enemyArray[i].getEnemyCoord().radius);
                        score.innerHTML = this.score.toString();
                        eatenEnemies.push(i);
                        eatenEnemiesRadius.push(this.enemyArray[i].getEnemyCoord().radius);
                    } else if (player.getUserCoords().radius < this.enemyArray[i].getEnemyCoord().radius) {
                        if (this.divineShield === false) {
                            console.log('divineShield');
                            this.Restart();
                        }
                    }
                }
            }
            if (eatenEnemies.length !== 0) {
                eatenEnemies.forEach((item) => {
                    this.enemyArray.splice(item, 1);
                    this.enemies -= 1;
                });
                eatenEnemiesRadius.forEach((item) => {
                    if (player.getUserCoords().radius + item <= this.MAX_USER_RADIUS) {
                        player.getUserCoords().radius += item;
                    } else {
                        player.getUserCoords().radius = this.MAX_USER_RADIUS;
                    }
                });
            }
            if (this.enemies === 0) {
                console.log('Win');
                this.userWin = true;
                this.Restart();
            }
        };
        initEnemies();
        animate();
    }

    Stop() {
        this.enemyArray = [];
        cancelAnimationFrame(this.animationId);
        document.removeEventListener('resize', this.eventResize, false);
        document.removeEventListener('keydown', this.eventKeyDown, false);
        document.removeEventListener('keyup', this.eventKeyUp, false);
        document.removeEventListener('mousedown', this.eventMouseDown, false);
    }

    Restart() {
        this.Stop();

        const score = document.querySelector('p[name=gameScore]');
        const gameText = document.querySelector('.game-page__text__ending');
        const gameRestartBtn = document.querySelector('.game-page__button__restart');
        let gameEndingText = 'Fail. ';

        if (this.userWin === true) {
            gameEndingText = 'Win! ';
        }

        gameText.innerHTML = gameEndingText + 'Score: ' + this.score;
        gameRestartBtn.style.display = 'block';
        gameText.style.display = 'block';
        score.style.display = 'none';

        score.innerHTML = '0';

        if (this.userWin === true) {
            this.userWin = false;
        }
    }
}
