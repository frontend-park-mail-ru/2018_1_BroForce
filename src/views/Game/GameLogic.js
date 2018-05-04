'use strict';

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

        this.colorArray = ['#fa4c2b', '#6aff6e', '#ffff82', '#ffce72', '#fa4c2b', '#0bfcff'];

    }

    Start() {
        const context = this.canvas.getContext('2d');

        let enemyArray = [];
        let enemyCoordArray = [];

        let keyW = false;
        let keyA = false;
        let keyS = false;
        let keyD = false;

        const userCoord = {
            x: undefined,
            y: undefined,
            radius: undefined,
            speed: undefined,
        };

        let mouse = {
            x: undefined,
            y: undefined,
        };

        let enemyCoord = {
            x: undefined,
            y: undefined,
            radius: undefined,
        };

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

        function Player(x, y, speed, radius) {
            userCoord.x = x;
            userCoord.y = y;
            userCoord.radius = radius;
            userCoord.speed = speed;

            this.draw = () => {
                context.save();
                context.beginPath();

                const gradient = context.createRadialGradient(userCoord.x, userCoord.y,
                    0, userCoord.x, userCoord.y, userCoord.radius);
                gradient.addColorStop(0, this.colorArray[4]);
                gradient.addColorStop(0.5, this.colorArray[5]);
                gradient.addColorStop(1, 'rgba(250,76,43,0)');

                context.arc(userCoord.x, userCoord.y, userCoord.radius, 0, Math.PI * 2, false);
                context.fillStyle = gradient;
                context.fill();
                context.closePath();
            };

            this.update = () => {
                const borderLeft = userCoord.x - userCoord.radius >= 0;
                const borderRight = userCoord.x + userCoord.radius <= innerWidth;
                const borderUp = userCoord.y - userCoord.radius > 0;
                const borderDown = userCoord.y + userCoord.radius < innerHeight;

                if (keyA === true && borderLeft) {
                    userCoord.x -= userCoord.speed;
                    userCoord.radius -= 0.1;
                }
                if (keyD === true && borderRight) {
                    userCoord.x += userCoord.speed;
                    userCoord.radius -= 0.1;
                }
                if (keyW === true && borderUp) {
                    userCoord.y -= userCoord.speed;
                    userCoord.radius -= 0.1;
                }
                if (keyS === true && borderDown) {
                    userCoord.y += userCoord.speed;
                    userCoord.radius -= 0.1;
                }

                this.draw();
            };
        }

        function Enemy(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;

            enemyCoord.x = this.x;
            enemyCoord.y = this.y;
            enemyCoord.radius = this.radius;
            enemyCoordArray.push(enemyCoord);

            this.draw = () => {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

                const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, this.colorArray[3]);
                gradient.addColorStop(0.5, this.colorArray[3]);
                gradient.addColorStop(1, 'rgba(250,76,43,0)');

                context.fillStyle = gradient;
                context.fill();
            };

            this.update = () => {
                if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }

                if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                    this.dy = - this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                enemyCoord.x = this.x;
                enemyCoord.y = this.y;
                enemyCoord.radius = this.radius;

                this.draw();
            };
        }

        const initEnemies = () => {
            for (let i = 0; i < this.ENEMIES_COUNT; i++) {
                let radius = Math.random() * 50 + 5;
                const x = Math.random() * (innerWidth - radius * 2) + radius;
                const y = Math.random() * (innerHeight - radius * 2) + radius;
                const dx = (Math.random() - 0.5);
                const dy = (Math.random() - 0.5);

                enemyArray.push(new Enemy(x, y, dx, dy, radius));
            }
        };

        const circle = new Player(innerWidth / 2, innerHeight / 2, 2, this.USER_RADIUS);
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            context.clearRect(0, 0, innerWidth, innerHeight);
            circle.update();

            let eatenEnemies = [];
            let eatenEnemiesRadiuses = [];

            for (let i = 0; i < enemyArray.length; i++) {
                enemyArray[i].update();
                enemyCoordArray[i] = enemyCoord;

                // Eating
                const distance = Math.sqrt(Math.pow((enemyCoord.x - userCoord.x), 2)
                    + Math.pow((enemyCoord.y - userCoord.y), 2));
                if (distance < userCoord.radius / 3 + enemyCoord.radius) {
                    if (userCoord.radius > enemyCoord.radius) {
                        const score = document.querySelector('p[name=gameScore]');
                        score.innerHTML = (+score.innerHTML + Math.round(enemyCoord.radius)).toString();
                        eatenEnemies.push(i);
                        eatenEnemiesRadiuses.push(enemyCoord.radius);
                    } else {
                        if (this.divineShield === false) {
                            userCoord.radius = 0;
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
                    if (userCoord.radius + item <= this.MAX_ENEMY_RADIUS) {
                        userCoord.radius += item;
                    } else {
                        userCoord.radius = this.MAX_ENEMY_RADIUS;
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
