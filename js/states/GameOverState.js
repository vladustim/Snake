import PlayState from "./PlayState.js";

export default class GameOverState {
    constructor(game, score) {
        this.game = game;
        this.score = score;
    }

    enter() {
        const overlay = document.getElementById("overlay");

        document.getElementById("gameText").innerText = "Гра завершена";
        overlay.style.display = "flex";

        document.getElementById("startBtn").onclick = () => {
            this.game.stateMachine.change(new PlayState(this.game));
        };
    }
}