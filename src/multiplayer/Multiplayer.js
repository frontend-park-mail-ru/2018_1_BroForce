'use strict';

import GameLogic from '../game/GameLogic.js';
import MultiUsers from './MultiUsers.js';
import Enemy from '../game/Enemy.js';

export default class Multiplayer extends GameLogic {
    constructor() {
        super();

        this.socket = new WebSocket('some::/Server');

        this.GameSettings = {
            'innerWidth': window.innerWidth,
            'innerHeight': window.innerHeight,
            'MAX_USER_RADIUS': this.MAX_USER_RADIUS,
            'MAX_ENEMY_RADIUS': this.MAX_ENEMY_RADIUS,
            'ENEMIES_COUNT': this.ENEMIES_COUNT,
            'USER_RADIUS': this.USER_RADIUS,
        };
    }

    Start() {
        // Sending game information to the server
        this.socket.send(JSON.stringify(this.GameSettings));

        let windowResize = false;

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

        this.eventMouseDown = document.addEventListener('mousedown', (event) => {
            if (event.x < player.getUserCoords().x) {
                this.keyD = true;
                setTimeout((()=> this.keyD = false), 100);
            } else if (event.x > player.getUserCoords().x) {
                this.keyA = true;
                setTimeout((()=> this.keyA = false), 100);
            }
            if (event.y > player.getUserCoords().y) {
                this.keyW = true;
                setTimeout((()=> this.keyW = false), 100);
            } else if (event.y < player.getUserCoords().y) {
                this.keyS = true;
                setTimeout((()=> this.keyS = false), 100);
            }
        });


        // ---------------- Pseudocode ----------------

        // Init some players
        const player1 = new MultiUsers(100, 100, 30, this.context, this.colorArray);
        const player2 = new MultiUsers(200, 200, 30, this.context, this.colorArray);

        // this.socket.onmessage = (event) => {
        // }

        const initEnemies = () => {
            for (let i = 0; i < this.ENEMIES_COUNT; i++) {
               // Init enemies
            }
        };

        const animate = () => {
            if (windowResize === true) {
                this.Stop();
                this.Start();
                windowResize = false;
                const score = document.querySelector('p[name=gameScore]');
                score.innerHTML = '0';
            }

            this.animationId = requestAnimationFrame(animate);
            this.context.clearRect(0, 0, innerWidth, innerHeight);

            this.socket.onmessage = (event) => {
                alert('Data ' + event.data);
                const response = JSON.parse(event.data);

                player1.update(response.userCoord[0].x, response.userCoord[0].y, response.userCoord[0].radius);
                player2.update(response.userCoord[1].x, response.userCoord[1].y, response.userCoord[1].radius);

                // Update enemies
                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].update(response.enemyCoord[i].x, response.enemyCoord[i].y, response.enemyCoord[i].radius);
                }
            };

            this.socket.onerror = (error) => {
                alert('Error ' + error.message);
            };
        };

        initEnemies();
        animate();
    }

    Stop() {
        this.socket.onclose = (event) => {
            if (event.wasClean) {
                alert('Socked was closed');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.enemyArray = [];
        cancelAnimationFrame(this.animationId);
        document.removeEventListener('resize', this.eventResize, false);
        document.removeEventListener('keydown', this.eventKeyDown, false);
        document.removeEventListener('keyup', this.eventKeyUp, false);
        document.removeEventListener('mousedown', this.eventMouseDown, false);
    }
}
