import StateMachine from "./StateMachine.js";
import EventEmitter from "./EventEmitter.js";
import MenuState from "../states/MenuState.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.events = new EventEmitter();
        this.stateMachine = new StateMachine();
        this.profileManager = null;

        this.lastTime = 0;
        this.highScore = 0;

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.stateMachine.change(new MenuState(this));

        requestAnimationFrame((t) => this.loop(t));
    }

    setProfileManager(profileManager) {
        this.profileManager = profileManager;
        this.updateHighScoreDisplay();
    }

    loadHighScore() {
        if (this.profileManager) {
            const profile = this.profileManager.getCurrentProfile();
            return profile ? profile.highScore : 0;
        }

        const saved = localStorage.getItem('snakeHighScore');
        return saved ? parseInt(saved, 10) : 0;
    }

    saveHighScore(score) {
        if (this.profileManager) {
            this.profileManager.updateScore(score);
            const profile = this.profileManager.getCurrentProfile();
            this.highScore = profile ? profile.highScore : 0;
        } else {
            if (score > this.highScore) {
                this.highScore = score;
                localStorage.setItem('snakeHighScore', score);
            }
        }

        this.events.emit('highscoreUpdated', this.highScore);
    }

    updateHighScoreDisplay() {
        this.highScore = this.loadHighScore();
        document.getElementById("highscore").innerText = "Рекорд: " + this.highScore;
    }

    resize() {
        // Обчислюємо розмір на основі viewport
        let size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.6);
        
        // Встановлюємо мінімальний та максимальний розмір
        size = Math.max(300, Math.min(size, 600));

        this.canvas.width = size;
        this.canvas.height = size;

        this.cellSize = Math.floor(size / 20);
    }

    loop(time) {
        let dt = (time - this.lastTime) / 1000; 
        this.lastTime = time;

        // Обмеження FPS до 30
        const targetFPS = 30;
        const frameTime = 1000 / targetFPS;
        
        if (!this.frameTime) this.frameTime = 0;
        this.frameTime += dt * 1000;
        
        if (this.frameTime >= frameTime) {
            this.stateMachine.update(this.frameTime / 1000);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.stateMachine.draw(this.ctx);
            this.frameTime = 0;
        }

        requestAnimationFrame((t) => this.loop(t));
    }
}