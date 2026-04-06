function updateSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (
        snake.x < 0 || snake.x >= 400 ||
        snake.y < 0 || snake.y >= 400
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
    if (!snake) return;

    if (e.key === "ArrowLeft" && snake.dx === 0) {
        snake.dx = -grid; snake.dy = 0;
    } else if (e.key === "ArrowUp" && snake.dy === 0) {
        snake.dy = -grid; snake.dx = 0;
    } else if (e.key === "ArrowRight" && snake.dx === 0) {
        snake.dx = grid; snake.dy = 0;
    } else if (e.key === "ArrowDown" && snake.dy === 0) {
        snake.dy = grid; snake.dx = 0;
    }
});