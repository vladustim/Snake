import Snake from "../entities/Snake.js";
import Cherry from "../entities/Cherry.js";
import InputSystem from "../systems/InputSystem.js";
import RenderSystem from "../systems/RenderSystem.js";
import GameOverState from "./GameOverState.js";

export default class PlayState {
    constructor(game) {
        this.game = game;
    }

    enter() {
        this.snake = new Snake();
        this.cherry = new Cherry();
        this.cherry.randomize(this.snake);

        this.score = 0;

        document.getElementById("overlay").style.display = "none";
        document.getElementById("score").innerText = "Рахунок: 0";

        this.input = new InputSystem(this.game, this.snake);
    }

    update() {
        this.snake.move();

        if (
            this.snake.x < 0 ||
            this.snake.x >= 20 ||
            this.snake.y < 0 ||
            this.snake.y >= 20 ||
            this.snake.collideSelf()
        ) {
            this.game.stateMachine.change(
                new GameOverState(this.game, this.score)
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

    draw(ctx) {
        RenderSystem.drawSnake(ctx, this.snake, this.game.cellSize);
        RenderSystem.drawCherry(ctx, this.cherry, this.game.cellSize);
    }
}