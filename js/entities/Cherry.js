import GameConfig from "../config.js";

export default class Cherry {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    randomize(snake) {
        let valid = false;

        while (!valid) {
            this.x = Math.floor(Math.random() * GameConfig.CELLS);
            this.y = Math.floor(Math.random() * GameConfig.CELLS);

            valid = !snake.cells.some(c => c.x === this.x && c.y === this.y);
        }
    }
}