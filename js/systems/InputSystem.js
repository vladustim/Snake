export default class InputSystem {
    constructor(snake) {
        this.snake = snake;
        this.handleKeydown = this.handleKeydown.bind(this);
        document.addEventListener("keydown", this.handleKeydown);
    }

    handleKeydown(e) {
        if (!this.snake) return;

        if (e.key === "ArrowLeft") {
            this.snake.setDirection(-1, 0);
        } else if (e.key === "ArrowRight") {
            this.snake.setDirection(1, 0);
        } else if (e.key === "ArrowUp") {
            this.snake.setDirection(0, -1);
        } else if (e.key === "ArrowDown") {
            this.snake.setDirection(0, 1);
        }
    }

    dispose() {
        document.removeEventListener("keydown", this.handleKeydown);
    }
}
