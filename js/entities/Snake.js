export default class Snake {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.dx = 1;
        this.dy = 0;

        this.cells = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];

        this.maxCells = 3;
    }

    move() {
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