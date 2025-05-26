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
        
        this.ballX = this.containerWidth / 2;
        this.ballY = this.containerHeight / 2;
        this.ballSpeedX = 5;
        this.ballSpeedY = 5;
        
        this.paddle1Y = this.containerHeight / 2 - 40;
        this.paddle2Y = this.containerHeight / 2 - 40;
        this.paddleSpeed = 8;
        
        this.score1 = 0;
        this.score2 = 0;
        
        this.keys = {};
        
        this.setupEventListeners();
        this.gameLoop();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.keys[e.key] = true);
        document.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }
    
    movePaddles() {
        // Player 1 controls (W and S keys)
        if (this.keys['w'] && this.paddle1Y > 0) {
            this.paddle1Y -= this.paddleSpeed;
        }
        if (this.keys['s'] && this.paddle1Y < this.containerHeight - 80) {
            this.paddle1Y += this.paddleSpeed;
        }
        
        // Player 2 controls (Arrow Up and Down)
        if (this.keys['ArrowUp'] && this.paddle2Y > 0) {
            this.paddle2Y -= this.paddleSpeed;
        }
        if (this.keys['ArrowDown'] && this.paddle2Y < this.containerHeight - 80) {
            this.paddle2Y += this.paddleSpeed;
        }
        
        this.paddle1.style.top = `${this.paddle1Y}px`;
        this.paddle2.style.top = `${this.paddle2Y}px`;
    }
    
    moveBall() {
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
        
        // Ball collision with top and bottom walls
        if (this.ballY <= 0 || this.ballY >= this.containerHeight - 15) {
            this.ballSpeedY = -this.ballSpeedY;
        }
        
        // Ball collision with paddles
        if (this.ballX <= 20 && this.ballY >= this.paddle1Y && this.ballY <= this.paddle1Y + 80) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        
        if (this.ballX >= this.containerWidth - 25 && this.ballY >= this.paddle2Y && this.ballY <= this.paddle2Y + 80) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        
        // Score points
        if (this.ballX <= 0) {
            this.score2++;
            this.resetBall();
        } else if (this.ballX >= this.containerWidth - 15) {
            this.score1++;
            this.resetBall();
        }
        
        this.ball.style.left = `${this.ballX}px`;
        this.ball.style.top = `${this.ballY}px`;
        this.player1Score.textContent = this.score1;
        this.player2Score.textContent = this.score2;
    }
    
    resetBall() {
        this.ballX = this.containerWidth / 2;
        this.ballY = this.containerHeight / 2;
        this.ballSpeedX = -this.ballSpeedX;
        this.ballSpeedY = Math.random() * 10 - 5;
    }
    
    gameLoop() {
        this.movePaddles();
        this.moveBall();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the window loads
window.onload = () => new PingPong();