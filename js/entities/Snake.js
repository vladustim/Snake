import GameConfig from "../config.js";

export default class Snake {
    constructor() {
        const start = Math.floor(GameConfig.CELLS / 2);
        this.x = start;
        this.y = start;
        this.dx = 1;
        this.dy = 0;
        this.inputQueue = [];

        this.cells = [
            { x: start, y: start },
            { x: start - 1, y: start },
            { x: start - 2, y: start }
        ];

        this.maxCells = 3;
    }

    setDirection(dx, dy) {
        if (this.inputQueue.length < 2) {
            const lastDir = this.inputQueue.length > 0 
                ? this.inputQueue[this.inputQueue.length - 1] 
                : { dx: this.dx, dy: this.dy };
            
            if ((dx !== 0 && lastDir.dx === 0) || (dy !== 0 && lastDir.dy === 0)) {
                this.inputQueue.push({ dx, dy });
            }
        }
    }

    move() {
        if (this.inputQueue.length > 0) {
            const nextInput = this.inputQueue.shift();
            this.dx = nextInput.dx;
            this.dy = nextInput.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.cells.unshift({ x: this.x, y: this.y });

        if (this.cells.length > this.maxCells) {
            this.cells.pop();
        }
    }

    grow() {
        this.maxCells++;
    }

    collideSelf() {
        return this.cells.slice(1).some(c => c.x === this.x && c.y === this.y);
    }
}