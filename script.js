const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const timeText = document.getElementById("time");
const bestScoreText = document.getElementById("bestScore");
const gameOverScreen = document.getElementById("gameOverScreen");
const startText = document.getElementById("startText");

let isJumping = false;
let position = 0;

let gravity = 0.6;   // yumuşak yerçekimi
let jumpPower = 12;

let gameStarted = false;
let gameOverFlag = false;

let speed = 5;
let obstaclePosition = 800;

let time = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
bestScoreText.innerText = bestScore;

// 🐱 yürüyüş hissi
const walkFrames = ["🐱", "😺"];
let walkIndex = 0;

setInterval(() => {
  if (gameStarted && !isJumping && !gameOverFlag) {
    player.innerText = walkFrames[walkIndex % walkFrames.length];
    walkIndex++;
  }
}, 200);

// 🎮 KLAVYE → herhangi tuş
document.addEventListener("keydown", () => {
  startGameOrJump();
});

// 📱 TELEFON → dokunma
document.addEventListener("touchstart", () => {
  startGameOrJump();
});

function startGameOrJump() {
  if (!gameStarted) {
    gameStarted = true;
    if (startText) startText.style.display = "none";
  } else if (!isJumping && !gameOverFlag) {
    jump();
  }
}

function jump() {
  isJumping = true;
  let velocity = jumpPower;

  let jumpInterval = setInterval(() => {
    position += velocity;
    velocity -= gravity;

    if (position <= 0) {
      position = 0;
      isJumping = false;
      clearInterval(jumpInterval);
    }

    player.style.bottom = position + "px";
  }, 20);
}

// ENGEL
setInterval(() => {
  if (!gameStarted || gameOverFlag) return;

  obstaclePosition -= speed;
  obstacle.style.left = obstaclePosition + "px";

  if (obstaclePosition < -40) {
    obstaclePosition = 800;
    speed += 0.4;
  }

  if (
    obstaclePosition > 60 &&
    obstaclePosition < 100 &&
    position < 35
  ) {
    endGame();
  }
}, 20);

// SÜRE
setInterval(() => {
  if (gameStarted && !gameOverFlag) {
    time++;
    timeText.innerText = time;
  }
}, 1000);

function endGame() {
  gameOverFlag = true;
  gameOverScreen.style.display = "flex";

  if (time > bestScore) {
    bestScore = time;
    localStorage.setItem("bestScore", bestScore);
  }

  bestScoreText.innerText = bestScore;
}

// 🔄 RESET
function resetGame() {
  location.reload();
}
