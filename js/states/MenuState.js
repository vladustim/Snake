import PlayState from "./PlayState.js";

export default class MenuState {
    constructor(game) {
        this.game = game;

        this.clickHandler = (e) => {
            this.game.stateMachine.change(new PlayState(this.game));
        };

        window.addEventListener("click", this.clickHandler);
    }

    update() {}

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("Змійка", 200, 200);

        ctx.fillStyle = "green";
        ctx.fillRect(250, 250, 100, 50);

        ctx.fillStyle = "black";
        ctx.fillText("Старт", 260, 285);
    }

    exit() {
        window.removeEventListener("click", this.clickHandler);
    }
}