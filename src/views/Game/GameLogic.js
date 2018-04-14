'use strict';

export default class GameLogic {
    constructor() {
        const MaxRadius = 100;

        const canvas = document.querySelector("canvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext('2d');

        let userCoord = {
            x: undefined,
            y: undefined,
            radius: undefined
        };

        const colorArray = ["#fa4c2b", "#6aff6e", "#ffff82", "#ffce72", '#fa4c2b', '#0bfcff'];

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        let mouse = {
            x: undefined,
            y: undefined
        };

        document.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        let keyW = false;
        let keyA = false;
        let keyS = false;
        let keyD = false;

        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 87:
                    keyW = true;
                    break;
                case 65:
                    keyA = true;
                    break;
                case 83:
                    keyS = true;
                    break;
                case 68:
                    keyD = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 87:
                    keyW = false;
                    break;
                case 65:
                    keyA = false;
                    break;
                case 83:
                    keyS = false;
                    break;
                case 68:
                    keyD = false;
                    break;
            }
        });

        function Circle(x, y, speed, radius) {
            userCoord.x = x;
            userCoord.y = y;
            userCoord.radius = radius;

            this.draw = () => {
                this.speed = speed;
                context.save();
                context.beginPath();

                const gradient = context.createRadialGradient(userCoord.x, userCoord.y,
                    0, userCoord.x, userCoord.y, userCoord.radius);
                gradient.addColorStop(0, colorArray[4]);
                gradient.addColorStop(0.5, colorArray[5]);
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
                    userCoord.x -= this.speed;
                    userCoord.radius -= 0.1;
                }
                if (keyD === true && borderRight) {
                    userCoord.x += this.speed;
                    userCoord.radius -= 0.1;
                }
                if (keyW === true && borderUp) {
                    userCoord.y -= this.speed;
                    userCoord.radius -= 0.1;
                }
                if (keyS === true && borderDown) {
                    userCoord.y += this.speed;
                    userCoord.radius -= 0.1;
                }

                this.draw();
            };
        }

        let enemyCoordArray = [];
        let enemyCoord = {
            x: undefined,
            y: undefined,
            radius: undefined
        };

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

            this.draw = function () {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

                const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, colorArray[3]);
                gradient.addColorStop(0.5, colorArray[3]);
                gradient.addColorStop(1, 'rgba(250,76,43,0)');

                context.fillStyle = gradient;
                context.fill();
            };

            this.update = function () {
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
            }
        }

        let enemyArray = [];

        const initEnemies = () => {
            for (let i = 0; i < 25; i++) {
                let radius = Math.random() * 50 + 5;
                const x = Math.random() * (innerWidth - radius * 2) + radius;
                const y = Math.random() * (innerHeight - radius * 2) + radius;
                const dx = (Math.random() - 0.5);
                const dy = (Math.random() - 0.5);

                enemyArray.push(new Enemy(x, y, dx, dy, radius));
            }
        };

        const circle = new Circle(200, 200, 2, 30);
        const animate = () => {
            requestAnimationFrame(animate);
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
                if (distance < userCoord.radius / 2 + enemyCoord.radius) {
                    if (userCoord.radius > enemyCoord.radius) {
                        eatenEnemies.push(i);
                        eatenEnemiesRadiuses.push(enemyCoord.radius);
                    } else {
                        console.log('Too small');
                    }
                }
            }

            if (eatenEnemies.length !== 0) {
                eatenEnemies.forEach((item) => {
                    enemyArray.splice(item, 1);
                });
                console.log('eatenEnemiesRadiuses', eatenEnemiesRadiuses);
                eatenEnemiesRadiuses.forEach((item) => {
                    console.log('userCoord.radius', userCoord.radius, 'item', item);
                    if (userCoord.radius + item <= MaxRadius) {
                        userCoord.radius += item;
                    }
                    // userCoord.radius += item;
                });
            }

            if (enemyArray.length === 0) {
                console.log('You Win!')
            }
        };


        initEnemies();
        animate();
    }
}