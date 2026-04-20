import StateMachine from "./StateMachine.js";
import EventEmitter from "./EventEmitter.js";
import MenuState from "../states/MenuState.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.events = new EventEmitter();
        this.stateMachine = new StateMachine();

        this.lastTime = 0;

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.stateMachine.change(new MenuState(this));

        requestAnimationFrame((t) => this.loop(t));
    }

    resize() {
        let size = Math.min(window.innerWidth, window.innerHeight) * 0.9;

        this.canvas.width = size;
        this.canvas.height = size;

        this.cellSize = Math.floor(size / 20);
    }

    loop(time) {
        let dt = (time - this.lastTime) / 1000; // 🔥 секунди
        this.lastTime = time;

        this.stateMachine.update(dt);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stateMachine.draw(this.ctx);

        requestAnimationFrame((t) => this.loop(t));
    }
}