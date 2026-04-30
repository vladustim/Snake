import Snake from "../entities/Snake.js";
import Cherry from "../entities/Cherry.js";
import InputSystem from "../systems/InputSystem.js";
import RenderSystem from "../systems/RenderSystem.js";
import GameOverState from "./GameOverState.js";
import GameConfig from "../config.js";

export default class PlayState {
    constructor(game) {
        this.game = game;
        this.isPaused = false;
    }

    enter() {
        this.snake = new Snake();
        this.cherry = new Cherry();
        this.cherry.randomize(this.snake);

        this.score = 0;
        this.moveTimer = 0; // таймер для контролю швидкості
        this.moveInterval = 1 / GameConfig.BASE_SPEED; // інтервал між рухами

        document.getElementById("overlay").style.display = "none";
        document.getElementById("score").innerText = "Рахунок: 0";
        this.game.updateHighScoreDisplay();
        
        // Переконуємося, що canvas має правильний розмір
        this.game.resize();

        this.input = new InputSystem(this.snake);
        
        this.pauseHandler = (e) => {
            if (e.key === "Escape") {
                this.isPaused = !this.isPaused;
            }
        };
        document.addEventListener("keydown", this.pauseHandler);
    }

    update(dt) {
        // Пропускаємо оновлення під час паузи
        if (this.isPaused) return;
        
        this.moveTimer += dt;
        
        // Рухати змійку тільки коли накопичився достатній час
        if (this.moveTimer >= this.moveInterval) {
            this.snake.move();
            this.moveTimer = 0;

            if (
                this.snake.x < 0 ||
                this.snake.x >= GameConfig.CELLS ||
                this.snake.y < 0 ||
                this.snake.y >= GameConfig.CELLS ||
                this.snake.collideSelf()
            ) {
                this.game.stateMachine.change(
                    new GameOverState(this.game, this.score, this.snake, this.cherry)
                );
                return;
            }

            if (this.snake.x === this.cherry.x && this.snake.y === this.cherry.y) {
                this.snake.grow();
                this.score++;
                document.getElementById("score").innerText = "Рахунок: " + this.score;
                this.cherry.randomize(this.snake);
            }
        }
    }

    draw(ctx) {
        RenderSystem.drawSnake(ctx, this.snake, this.game.cellSize);
        RenderSystem.drawCherry(ctx, this.cherry, this.game.cellSize);
        
        // Малюємо індикатор паузи
        if (this.isPaused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            ctx.fillStyle = "#0f0";
            ctx.font = "40px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("ПАУЗА", ctx.canvas.width / 2, ctx.canvas.height / 2);
        }
    }

    exit() {
        this.input?.dispose();
        document.removeEventListener("keydown", this.pauseHandler);
    }
}