// Catch the Circle
// Click the red circle as many times as you can before the time runs out.

// How long one game lasts, in seconds
const GAME_SECONDS = 30;

// Elements from the page
const startButton = document.getElementById("start-button");
const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const message = document.getElementById("message");

// Game state
let score = 0;
let timeLeft = GAME_SECONDS;
let timer = null;

// What happens when the player clicks
startButton.addEventListener("click", startGame);
target.addEventListener("click", catchTarget);


// Show the current score on the page
function showScore() {
    scoreText.textContent = score;
}

// Show the time left on the page
function showTime() {
    timeText.textContent = timeLeft;
}

// Start a new game
function startGame() {
    // Start again from zero
    score = 0;
    timeLeft = GAME_SECONDS;
    showScore();
    showTime();

    message.textContent = "Click the red circle!";
    startButton.disabled = true;

    // Show the circle first, then place it (its size is needed for placing)
    target.style.display = "block";
    moveTarget();

    // Call countDown once every second
    timer = setInterval(countDown, 1000);
}

// Runs every second while the game is on
function countDown() {
    timeLeft--;
    showTime();

    if (timeLeft <= 0) {
        endGame();
    }
}

// The player clicked the circle: one point and a new place
function catchTarget() {
    score++;
    showScore();
    moveTarget();
}

// Put the circle in a random place inside the game box
function moveTarget() {
    // Size of the box and of the circle
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;

    // The furthest the circle can go and still stay inside the box
    const maxLeft = areaWidth - targetWidth;
    const maxTop = areaHeight - targetHeight;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    target.style.left = randomLeft + "px";
    target.style.top = randomTop + "px";
}

// Time is over
function endGame() {
    clearInterval(timer);

    target.style.display = "none";
    startButton.disabled = false;
    startButton.textContent = "Play Again";
    message.textContent = "Game over! Your final score is " + score + ".";
}


// Show the starting numbers when the page opens
showScore();
showTime();
