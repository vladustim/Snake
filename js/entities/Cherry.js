export default class Cherry {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    randomize(snake) {
        let valid = false;

        while (!valid) {
            this.x = Math.floor(Math.random() * 20);
            this.y = Math.floor(Math.random() * 20);

            valid = !snake.cells.some(c => c.x === this.x && c.y === this.y);
        }
    }
}