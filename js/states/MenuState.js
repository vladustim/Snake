export default class MenuState {
    constructor(game) {
        this.game = game;
    }

    update() {}

    draw(ctx) {
        ctx.fillStyle = "#0f0";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Змійка", ctx.canvas.width / 2, ctx.canvas.height / 2 - 40);

        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText("Натисніть Старт або Enter", ctx.canvas.width / 2, ctx.canvas.height / 2 + 20);
    }

    exit() {}
}