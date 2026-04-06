let canChangeDirection = true;

function updateSnake() {
    canChangeDirection = true;

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (
        snake.x < 0 ||
        snake.x >= cellsCount ||
        snake.y < 0 ||
        snake.y >= cellsCount
    ) {
        gameOver();
        return;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

document.addEventListener("keydown", e => {
    const overlay = document.getElementById("overlay");
    const overlayVisible = overlay.style.display !== "none";

    // 🎮 Старт гри (Enter / Space)
    if (overlayVisible && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        startGame();
        return;
    }

    if (!running || !canChangeDirection) return;

    if (e.key === "ArrowLeft" && snake.dx === 0) {
        snake.dx = -1;
        snake.dy = 0;
        canChangeDirection = false;
    } 
    else if (e.key === "ArrowRight" && snake.dx === 0) {
        snake.dx = 1;
        snake.dy = 0;
        canChangeDirection = false;
    } 
    else if (e.key === "ArrowUp" && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -1;
        canChangeDirection = false;
    } 
    else if (e.key === "ArrowDown" && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = 1;
        canChangeDirection = false;
    }
});