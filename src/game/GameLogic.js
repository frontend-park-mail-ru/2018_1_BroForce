'use strict';

import PlayerNew from './Player.js';
import Enemy from './Enemy.js';

// export default class GameLogic {
//     constructor() {
//         this.canvas = document.querySelector('canvas');
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//
//         this.MAX_ENEMY_RADIUS = 100;
//         this.ENEMIES_COUNT = 30;
//         this.USER_RADIUS = 30;
//         // this.USER_NEON_LIGHT = 40;
//         this.animationId = null;
//         this.colorArray = ['#fa4c2b', '#6aff6e', '#ffff82', '#ffce72', '#fa4c2b', '#0bfcff'];
//
//
//         this.divineShield = true;
//         setTimeout((()=> this.divineShield = false), 3000);
//     }
//
//     Start() {
//         const context = this.canvas.getContext('2d');
//
//         const enemyArray = [];
//
//         let keyW = false;
//         let keyA = false;
//         let keyS = false;
//         let keyD = false;
//
//         window.addEventListener('resize', function() {
//             this.canvas.width = window.innerWidth;
//             this.canvas.height = window.innerHeight;
//         });
//
//         document.addEventListener('keydown', (event) => {
//             switch (event.keyCode) {
//                 case 87 || 38:
//                     keyW = true;
//                     break;
//                 case 65 || 37:
//                     keyA = true;
//                     break;
//                 case 83 || 40:
//                     keyS = true;
//                     break;
//                 case 68 || 39:
//                     keyD = true;
//                     break;
//
//                 case 38:
//                     keyW = true;
//                     break;
//                 case 37:
//                     keyA = true;
//                     break;
//                 case 40:
//                     keyS = true;
//                     break;
//                 case 39:
//                     keyD = true;
//                     break;
//                 default:
//                     break;
//             }
//         });
//
//         document.addEventListener('keyup', (event) => {
//             switch (event.keyCode) {
//                 case 87 || 38:
//                     keyW = false;
//                     break;
//                 case 65 || 37:
//                     keyA = false;
//                     break;
//                 case 83 || 40:
//                     keyS = false;
//                     break;
//                 case 68 || 39:
//                     keyD = false;
//                     break;
//
//                 case 38:
//                     keyW = false;
//                     break;
//                 case 37:
//                     keyA = false;
//                     break;
//                 case 40:
//                     keyS = false;
//                     break;
//                 case 39:
//                     keyD = false;
//                     break;
//                 default:
//                     break;
//             }
//         });
//
//         const initEnemies = () => {
//             for (let i = 0; i < this.ENEMIES_COUNT; i++) {
//                 const radius = Math.random() * 50 + 5;
//                 const x = Math.random() * (innerWidth - radius * 2) + radius;
//                 const y = Math.random() * (innerHeight - radius * 2) + radius;
//                 const dx = (Math.random() - 0.5);
//                 const dy = (Math.random() - 0.5);
//
//                 enemyArray.push(new Enemy(x, y, dx, dy, radius, context, this.colorArray));
//             }
//         };
//         const player = new PlayerNew(innerWidth / 2, innerHeight / 2, 2, this.USER_RADIUS, context, this.colorArray);
//
//         const animate = () => {
//             if (player.getUserCoords().radius <= 0) {
//                 player.getUserCoords().radius = 0;
//                 cancelAnimationFrame(this.animationId);
//                 this.Start();
//                 return;
//             }
//             this.animationId = requestAnimationFrame(animate);
//             context.clearRect(0, 0, innerWidth, innerHeight);
//             player.update(keyW, keyS, keyA, keyD);
//
//             const eatenEnemies = [];
//             const eatenEnemiesRadiuses = [];
//
//             for (let i = 0; i < enemyArray.length; i++) {
//                 enemyArray[i].update();
//
//                 // Eating
//                 const distance = Math.sqrt(Math.pow((enemyArray[i].getEnemyCoord().x - player.getUserCoords().x), 2)
//                     + Math.pow((enemyArray[i].getEnemyCoord().y - player.getUserCoords().y), 2));
//                 if (distance < player.getUserCoords().radius / 3 + enemyArray[i].getEnemyCoord().radius) {
//                     if (player.getUserCoords().radius > enemyArray[i].getEnemyCoord().radius) {
//                         const score = document.querySelector('p[name=gameScore]');
//                         score.innerHTML = (+score.innerHTML + Math.round(enemyArray[i].getEnemyCoord().radius)).toString();
//                         eatenEnemies.push(i);
//                         eatenEnemiesRadiuses.push(enemyArray[i].getEnemyCoord().radius);
//                     } else {
//                         if (this.divineShield === false) {
//                             console.log('You lose');
//                             player.getUserCoords().radius = 0;
//                             cancelAnimationFrame(this.animationId);
//                             this.Start();
//                         }
//                     }
//                 }
//             }
//
//             if (eatenEnemies.length !== 0) {
//                 eatenEnemies.forEach((item) => {
//                     enemyArray.splice(item, 1);
//                 });
//                 eatenEnemiesRadiuses.forEach((item) => {
//                     if (player.getUserCoords().radius + item <= this.MAX_ENEMY_RADIUS) {
//                         player.getUserCoords().radius += item;
//                     } else {
//                         player.getUserCoords().radius = this.MAX_ENEMY_RADIUS;
//                     }
//                 });
//             }
//
//             if (enemyArray.length === 0) {
//                 console.log('You Win!');
//                 cancelAnimationFrame(this.animationId);
//                 const gameText = document.querySelector('.game-win');
//                 gameText.innerHTML = 'You win';
//             }
//         };
//
//         initEnemies();
//         animate();
//     }
//
//     Stop() {
//         cancelAnimationFrame(this.animationId);
//     }
// }

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
            if (player.getUserCoords().radius <= 0) {
                player.getUserCoords().radius = 0;
                cancelAnimationFrame(this.animationId);
                this.Start();
                return;
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
                        if (this.divineShield === false) {
                            console.log('You lose');
                            player.getUserCoords().radius = 0;
                            cancelAnimationFrame(this.animationId);
                            this.Start();
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

            if (enemyArray.length === 0) {
                console.log('You Win!');
                cancelAnimationFrame(this.animationId);
                const gameText = document.querySelector('.game-win');
                gameText.innerHTML = 'You win';
            }
        };

        initEnemies();
        animate();
    }

    Stop() {
        cancelAnimationFrame(this.animationId);
        removeEventListener(this.eventResize);
        removeEventListener(this.eventKeyDown);
        removeEventListener(this.eventKeyUp);
    }
}

