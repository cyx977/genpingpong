class PingPong {
    constructor() {
        this.ball = document.getElementById('ball');
        this.paddle1 = document.getElementById('paddle1');
        this.paddle2 = document.getElementById('paddle2');
        this.player1Score = document.getElementById('player1Score');
        this.player2Score = document.getElementById('player2Score');
        
        this.gameContainer = document.querySelector('.game-container');
        this.containerWidth = this.gameContainer.offsetWidth;
        this.containerHeight = this.gameContainer.offsetHeight;
        
        this.balls = [{
            element: this.ball,
            x: this.containerWidth / 2,
            y: this.containerHeight / 2,
            speedX: 5,
            speedY: 5
        }];
        
        this.paddle1Y = this.containerHeight / 2 - 40;
        this.paddle2Y = this.containerHeight / 2 - 40;
        this.paddleSpeed = 8;
        
        this.score1 = 0;
        this.score2 = 0;
        
        this.keys = {};
        this.activePlayer = null;
        
        this.powerups = [];
        this.powerupInterval = null;
        this.powerupChance = 0.005; // Chance per frame to spawn a powerup
        
        this.setupEventListeners();
        this.startPowerupGeneration();
        this.gameLoop();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            this.highlightActivePlayer(e.key);
        });
        document.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }
    
    highlightActivePlayer(key) {
        // Remove active class from both paddles
        this.paddle1.classList.remove('active-paddle');
        this.paddle2.classList.remove('active-paddle');
        
        // Add active class based on which key was pressed
        if (key === 'w' || key === 's') {
            this.paddle1.classList.add('active-paddle');
            this.activePlayer = 'player1';
        } else if (key === 'ArrowUp' || key === 'ArrowDown') {
            this.paddle2.classList.add('active-paddle');
            this.activePlayer = 'player2';
        }
        
        // Reset active player highlight after a delay
        setTimeout(() => {
            if (this.activePlayer === 'player1') {
                this.paddle1.classList.remove('active-paddle');
            } else if (this.activePlayer === 'player2') {
                this.paddle2.classList.remove('active-paddle');
            }
        }, 1000);
    }
    
    movePaddles() {
        // Player 1 controls (W and S keys)
        if (this.keys['w'] && this.paddle1Y > 0) {
            this.paddle1Y -= this.paddleSpeed;
            this.paddle1.classList.add('active-paddle');
        }
        if (this.keys['s'] && this.paddle1Y < this.containerHeight - 80) {
            this.paddle1Y += this.paddleSpeed;
            this.paddle1.classList.add('active-paddle');
        }
        
        // Player 2 controls (Arrow Up and Down)
        if (this.keys['ArrowUp'] && this.paddle2Y > 0) {
            this.paddle2Y -= this.paddleSpeed;
            this.paddle2.classList.add('active-paddle');
        }
        if (this.keys['ArrowDown'] && this.paddle2Y < this.containerHeight - 80) {
            this.paddle2Y += this.paddleSpeed;
            this.paddle2.classList.add('active-paddle');
        }
        
        this.paddle1.style.top = `${this.paddle1Y}px`;
        this.paddle2.style.top = `${this.paddle2Y}px`;
    }
    
    moveBalls() {
        const ballsToRemove = [];
        
        this.balls.forEach((ball, index) => {
            ball.x += ball.speedX;
            ball.y += ball.speedY;
            
            // Ball collision with top and bottom walls
            if (ball.y <= 0 || ball.y >= this.containerHeight - 15) {
                ball.speedY = -ball.speedY;
            }
            
            // Ball collision with paddles
            if (ball.x <= 20 && ball.y >= this.paddle1Y && ball.y <= this.paddle1Y + 80) {
                ball.speedX = -ball.speedX;
                this.paddle1.classList.add('active-paddle');
                setTimeout(() => this.paddle1.classList.remove('active-paddle'), 300);
            }
            
            if (ball.x >= this.containerWidth - 25 && ball.y >= this.paddle2Y && ball.y <= this.paddle2Y + 80) {
                ball.speedX = -ball.speedX;
                this.paddle2.classList.add('active-paddle');
                setTimeout(() => this.paddle2.classList.remove('active-paddle'), 300);
            }
            
            // Score points
            if (ball.x <= 0) {
                this.score2++;
                ballsToRemove.push(index);
            } else if (ball.x >= this.containerWidth - 15) {
                this.score1++;
                ballsToRemove.push(index);
            }
            
            // Update ball position
            ball.element.style.left = `${ball.x}px`;
            ball.element.style.top = `${ball.y}px`;
        });
        
        // Remove balls that scored
        for (let i = ballsToRemove.length - 1; i >= 0; i--) {
            const index = ballsToRemove[i];
            
            // Don't remove the main ball, just reset it
            if (index === 0) {
                this.resetBall(this.balls[0]);
            } else {
                // Remove the ball element from the DOM
                this.gameContainer.removeChild(this.balls[index].element);
                // Remove the ball from the array
                this.balls.splice(index, 1);
            }
        }
        
        // Update score display
        this.player1Score.textContent = this.score1;
        this.player2Score.textContent = this.score2;
    }
    
    resetBall(ball) {
        ball.x = this.containerWidth / 2;
        ball.y = this.containerHeight / 2;
        ball.speedX = -ball.speedX;
        ball.speedY = Math.random() * 10 - 5;
    }
    
    startPowerupGeneration() {
        // Clear any existing interval
        if (this.powerupInterval) {
            clearInterval(this.powerupInterval);
        }
        
        // Generate powerups randomly during gameplay
        this.powerupInterval = setInterval(() => {
            if (Math.random() < this.powerupChance) {
                this.createPowerup();
            }
        }, 1000);
    }
    
    createPowerup() {
        // Determine powerup type
        const powerupType = Math.random() < 0.5 ? 'split' : 'speed';
        
        // Create powerup element
        const powerup = document.createElement('div');
        powerup.className = `powerup ${powerupType}-powerup`;
        
        // Position powerup randomly in the game area
        const x = Math.random() * (this.containerWidth - 40) + 20;
        const y = Math.random() * (this.containerHeight - 40) + 20;
        
        powerup.style.left = `${x}px`;
        powerup.style.top = `${y}px`;
        
        // Add powerup to the game container
        this.gameContainer.appendChild(powerup);
        
        // Add powerup to the array
        this.powerups.push({
            element: powerup,
            x,
            y,
            type: powerupType
        });
        
        // Remove powerup after 5 seconds if not collected
        setTimeout(() => {
            this.removePowerup(powerup);
        }, 5000);
    }
    
    removePowerup(element) {
        const index = this.powerups.findIndex(p => p.element === element);
        if (index !== -1) {
            this.gameContainer.removeChild(element);
            this.powerups.splice(index, 1);
        }
    }
    
    checkPowerupCollisions() {
        const powerupsToRemove = [];
        
        this.balls.forEach(ball => {
            this.powerups.forEach((powerup, index) => {
                // Check if ball collides with powerup
                const dx = ball.x - powerup.x;
                const dy = ball.y - powerup.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 20) { // Ball radius + powerup radius
                    // Apply powerup effect
                    if (powerup.type === 'split') {
                        this.splitBall(ball);
                    } else if (powerup.type === 'speed') {
                        this.speedBoost(ball);
                    }
                    
                    // Mark powerup for removal
                    powerupsToRemove.push(index);
                }
            });
        });
        
        // Remove collected powerups
        for (let i = powerupsToRemove.length - 1; i >= 0; i--) {
            const index = powerupsToRemove[i];
            this.gameContainer.removeChild(this.powerups[index].element);
            this.powerups.splice(index, 1);
        }
    }
    
    splitBall(ball) {
        // Create two new balls
        for (let i = 0; i < 2; i++) {
            // Create new ball element
            const newBallElement = document.createElement('div');
            newBallElement.className = 'ball';
            this.gameContainer.appendChild(newBallElement);
            
            // Calculate new direction (slightly different from original)
            const angle = Math.random() * Math.PI / 2 - Math.PI / 4; // -45 to 45 degrees
            const speed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
            
            const newSpeedX = Math.sign(ball.speedX) * speed * Math.cos(angle);
            const newSpeedY = speed * Math.sin(angle);
            
            // Add new ball to the array
            this.balls.push({
                element: newBallElement,
                x: ball.x,
                y: ball.y,
                speedX: newSpeedX,
                speedY: newSpeedY
            });
        }
    }
    
    speedBoost(ball) {
        // Increase ball speed by 50%
        ball.speedX *= 1.5;
        ball.speedY *= 1.5;
        
        // Visual effect for speed boost
        ball.element.style.boxShadow = '0 0 10px #00ffff';
        
        // Reset effect after 3 seconds
        setTimeout(() => {
            ball.speedX /= 1.5;
            ball.speedY /= 1.5;
            ball.element.style.boxShadow = 'none';
        }, 3000);
    }
    
    gameLoop() {
        this.movePaddles();
        this.moveBalls();
        this.checkPowerupCollisions();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the window loads
window.onload = () => new PingPong();