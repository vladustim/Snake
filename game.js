const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const cellsCount = 20;
let grid;

let snake, apple;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let running = false;

document.getElementById("highscore").innerText = "Рекорд: " + highScore;

document.getElementById("startBtn").addEventListener("click", startGame);

// Зміна розміру гри
function resizeGame() {
    let size = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    canvas.width = size;
    canvas.height = size;

    grid = size / cellsCount;

    document.querySelector(".wrapper").style.width = size + "px";
    document.querySelector(".wrapper").style.height = size + "px";
}

window.addEventListener("resize", resizeGame);
resizeGame();

function placeApple() {
    let valid = false;
    while (!valid) {
        apple = {
            x: randCell(),
            y: randCell()
        };
        valid = !snake.cells.some(cell => cell.x === apple.x && cell.y === apple.y);
    }
}

function randCell() {
    return Math.floor(Math.random() * cellsCount);
}

let canChangeDirection = true;

function startGame() {
    let startX = Math.floor(cellsCount / 2);
    let startY = Math.floor(cellsCount / 2);

    snake = {
        x: startX,
        y: startY,
        dx: 1,
        dy: 0,
        cells: [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ],
        maxCells: 3
    };

    score = 0;
    running = true;
    lastTime = 0;
    accumulator = 0;

    placeApple();

    document.getElementById("score").innerText = "Рахунок: 0";
    document.getElementById("overlay").style.display = "none";
}

// Оновлення змійки
function updateSnake() {
    canChangeDirection = true;

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (
        snake.x < 0 || snake.x >= cellsCount ||
        snake.y < 0 || snake.y >= cellsCount
    ) {
        gameOver();
        return; 
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Видаляємо зайву клітинку
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
            gameOver();
            return;
        }
    }

    if (snake.x === apple.x && snake.y === apple.y) {
        snake.maxCells++;
        score++;
        document.getElementById("score").innerText = "Рахунок: " + score;
        placeApple();
    }
}

let lastTime = 0;
let accumulator = 0;

function getStep() {
    const speed = Math.min(15, 8 + score * 0.3); // максимум
    return 1000 / speed;
}

// Основний цикл гри
function gameLoop(time) {
    requestAnimationFrame(gameLoop);

    if (!running) return;

    if (!lastTime) lastTime = time;
    let delta = time - lastTime;
    lastTime = time;

    accumulator += delta;

    while (accumulator >= getStep()) {
        let currentStep = getStep();
        updateSnake();
        accumulator -= currentStep;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.cells.forEach(cell => {
        ctx.fillRect(cell.x * grid, cell.y * grid, grid - 2, grid - 2);
    });
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * grid, apple.y * grid, grid - 2, grid - 2);
}

function gameOver() {
    running = false;

    document.getElementById("gameText").innerText = "Гра завершена";
    document.getElementById("overlay").style.display = "flex";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        document.getElementById("highscore").innerText = "Рекорд: " + highScore;
    }
}

document.addEventListener("keydown", e => {
    const overlay = document.getElementById("overlay");
    const overlayVisible = overlay.style.display !== "none";

    if (overlayVisible && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        startGame();
        return;
    }

    if (!running || !canChangeDirection) return;

    if ((e.key === "ArrowLeft" || e.key === "a") && snake.dx === 0) {
        snake.dx = -1; snake.dy = 0; canChangeDirection = false;
    }
    else if ((e.key === "ArrowRight" || e.key === "d") && snake.dx === 0) {
        snake.dx = 1; snake.dy = 0; canChangeDirection = false;
    }
    else if ((e.key === "ArrowUp" || e.key === "w") && snake.dy === 0) {
        snake.dx = 0; snake.dy = -1; canChangeDirection = false;
    }
    else if ((e.key === "ArrowDown" || e.key === "s") && snake.dy === 0) {
        snake.dx = 0; snake.dy = 1; canChangeDirection = false;
    }
});


requestAnimationFrame(gameLoop);