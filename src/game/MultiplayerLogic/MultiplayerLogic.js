'use strict';

import GameLogic from '../SingleplayerLogic/GameLogic.js';
import MultiUsers from './MultiUsers.js';
import MultiEnemies from './MultiEnemies';
import webSocket from './WebSocket.js';

export default class MultiplayerLogic {
    constructor() {
        webSocket.Open();

        this.canvas = document.querySelector('.game-page__canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');

        this.colorArray = ['#fa4c2b', '#6aff6e', '#ffff82', '#ffce72', '#fa4c2b', '#0bfcff'];
        this.enemyArray = [];
        this.userWin = false;
        this.divineShield = true;

        this.GameStatus = {
            'status': undefined,
        };
    }

    Start() {
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

        this.GameStatus.status = 'Init';
        webSocket.Send(JSON.stringify(this.GameStatus));

        if (webSocket.message !== undefined) {
                const response = JSON.parse(webSocket.message);

                this.player1 = new MultiUsers(response.userCoord[0].x, response.userCoord[0].y,
                    response.userCoord[0].radius, this.context, this.colorArray);
                this.player2 = new MultiUsers(response.userCoord[1].x, response.userCoord[1].y,
                    response.userCoord[1].radius, this.context, this.colorArray);

                for (let i = 0; i < this.ENEMIES_COUNT; i++) {
                    this.enemyArray.push(new MultiEnemies(response.enemyCoord[i].x, response.enemyCoord[i].y,
                        response.enemyCoord[i].radius, this.context, this.colorArray));
                }
        }

        this.GameStatus.status = 'Ready';
        webSocket.Send(JSON.stringify(this.GameStatus));

        const animate = () => {
            if (windowResize === true) {
                this.Stop();
                this.Start();
                windowResize = false;
                const score = document.querySelector('p[name=gameScore]');
                score.innerHTML = '0';
            }

            this.userKey = {
                keyW: this.keyW,
                keyA: this.keyA,
                keyS: this.keyS,
                keyD: this.keyD,
            };

            webSocket.Send(JSON.stringify(this.userKey));

            this.animationId = requestAnimationFrame(animate);
            this.context.clearRect(0, 0, innerWidth, innerHeight);

            if (webSocket.GetMessage !== undefined) {
                this.player1.update(webSocket.GetMessage.userCoord[0].x, webSocket.GetMessage.userCoord[0].y, webSocket.GetMessage.userCoord[0].radius);
                this.player2.update(webSocket.GetMessage.userCoord[1].x, webSocket.GetMessage.userCoord[1].y, webSocket.GetMessage.userCoord[1].radius);

                // Update enemies
                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].update(webSocket.GetMessage.enemyCoord[i].x, webSocket.GetMessage.enemyCoord[i].y,
                        webSocket.GetMessage.enemyCoord[i].radius);
                }
            }
        };

        animate();
    }

    Stop() {
        webSocket.Close();

        this.enemyArray = [];
        cancelAnimationFrame(this.animationId);
        document.removeEventListener('resize', this.eventResize, false);
        document.removeEventListener('keydown', this.eventKeyDown, false);
        document.removeEventListener('keyup', this.eventKeyUp, false);
        document.removeEventListener('mousedown', this.eventMouseDown, false);
    }
}
