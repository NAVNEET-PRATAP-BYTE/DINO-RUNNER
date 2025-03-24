const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const gameOverElement = document.getElementById("gameOver");

let isJumping = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameSpeed = 3;
let isGameOver = false;

highScoreElement.textContent = highScore;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (isGameOver) {
            resetGame();
            return;
        }
        if (!isJumping) {
            jump();
        }
        event.preventDefault();
    }
});

function jump() {
    if (isJumping) return;
    
    isJumping = true;
    dino.style.animation = "jump 1s linear";
    
    setTimeout(() => {
        dino.style.animation = "";
        isJumping = false;
    }, 1000);
}

function moveCactus() {
    let position = 1000;
    
    let moveInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(moveInterval);
            return;
        }

        position -= gameSpeed;
        
        if (position <= -30) {
            position = 800;
            score += 100;
            scoreElement.textContent = score;
            gameSpeed += 0.2;
        }

        cactus.style.right = (1000 - position) + "px";

        // Collision detection
        let dinoRect = dino.getBoundingClientRect();
        let cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.right > cactusRect.left &&
            dinoRect.left < cactusRect.right &&
            dinoRect.bottom > cactusRect.top
        ) {
            gameOver();
            clearInterval(moveInterval);
        }
    }, 20);
}

function gameOver() {
    isGameOver = true;
    gameOverElement.style.display = "block";
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = highScore;
    }
}

function resetGame() {
    isGameOver = false;
    score = 0;
    gameSpeed = 3;
    scoreElement.textContent = "0";
    gameOverElement.style.display = "none";
    cactus.style.right = "0px";
    moveCactus();
}

// Start the game
moveCactus();