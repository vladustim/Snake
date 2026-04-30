import RenderSystem from "../systems/RenderSystem.js";

export default class GameOverState {
    constructor(game, score, snake, cherry) {
        this.game = game;
        this.score = score;
        this.snake = snake;
        this.cherry = cherry;
    }

    enter() {
        // Зберігаємо рекорд, якщо поточний рахунок більший
        this.game.saveHighScore(this.score);
        this.game.updateHighScoreDisplay();

        const overlay = document.getElementById("overlay");
        const gameText = document.getElementById("gameText");
        const startBtn = document.getElementById("startBtn");

        gameText.innerHTML = `Гра завершена<br><span style="font-size: 20px; margin-top: 10px; display: block;">Рахунок: ${this.score}</span>`;
        startBtn.textContent = "Старт";
        overlay.style.display = "flex";
    }

    update() {}

    draw(ctx) {
        if (this.snake && this.cherry) {
            RenderSystem.drawSnake(ctx, this.snake, this.game.cellSize);
            RenderSystem.drawCherry(ctx, this.cherry, this.game.cellSize);
        }
    }
}
