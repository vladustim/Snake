export default class RenderSystem {
    static drawSnake(ctx, snake, size) {
        ctx.fillStyle = "lime";
        snake.cells.forEach(c => {
            ctx.fillRect(c.x * size, c.y * size, size - 2, size - 2);
        });
    }

    static drawCherry(ctx, cherry, size) {
        ctx.fillStyle = "red";
        ctx.fillRect(cherry.x * size, cherry.y * size, size - 2, size - 2);
    }
}