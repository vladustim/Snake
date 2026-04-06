const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;

let snake, apple;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let running = false;

document.getElementById("highscore").innerText = "Рекорд: " + highScore;

function startGame() {
    snake = {
        x: 160,
        y: 160,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 5
    };

    apple = {
        x: rand(),
        y: rand()
    };

    score = 0;
    running = true;

    document.getElementById("score").innerText = "Рахунок: 0";
    document.getElementById("overlay").style.display = "none";
}

function rand() {
    return Math.floor(Math.random() * 20) * grid;
}

let lastTime = 0;

function gameLoop(time) {
    requestAnimationFrame(gameLoop);

    if (!running) return;
    if (time - lastTime < 100) return;
    lastTime = time;

    ctx.clearRect(0, 0, 400, 400);

    updateSnake();
    drawSnake();
    drawApple();
}

function drawSnake() {
    ctx.fillStyle = "lime";

    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid - 2, grid - 2);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            document.getElementById("score").innerText = "Рахунок: " + score;

            apple.x = rand();
            apple.y = rand();
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x &&
                cell.y === snake.cells[i].y) {
                gameOver();
            }
        }
    });
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, grid - 2, grid - 2);
}

function gameOver() {
    running = false;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        document.getElementById("highscore").innerText = "Рекорд: " + highScore;
    }

    document.getElementById("overlay").style.display = "flex";
}

requestAnimationFrame(gameLoop);