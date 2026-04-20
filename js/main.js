import Game from "./core/game.js";
import PlayState from "./states/PlayState.js";

const canvas = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("overlay");

const game = new Game(canvas);

startBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    game.stateMachine.change(new PlayState(game));
});