export default class InputSystem {
    constructor(game, snake) {
        document.addEventListener("keydown", e => {
            if (!snake) return;

            if (e.key === "ArrowLeft" && snake.dx === 0) {
                snake.dx = -1; snake.dy = 0;
            }
            else if (e.key === "ArrowRight" && snake.dx === 0) {
                snake.dx = 1; snake.dy = 0;
            }
            else if (e.key === "ArrowUp" && snake.dy === 0) {
                snake.dx = 0; snake.dy = -1;
            }
            else if (e.key === "ArrowDown" && snake.dy === 0) {
                snake.dx = 0; snake.dy = 1;
            }
        });
    }
}