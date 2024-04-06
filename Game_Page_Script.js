import { buttons, player } from "./Fixed_Variables_Objects.js";
import { gameBackgroundImages } from "./API_Functions.js";
import {
  cellsColor,
  gameExecution,
  getCellsValueFromLocalStorage,
  resetCellsValueAtStart,
} from "./Game_Functions.js";
import {
  getFromLocalStorage,
  addToLocalStorage,
} from "./URL_&_LocalStorage.js";

function onArrowsKeyUp(action) {
  if (
    (action.key === "ArrowUp" && action.keyCode === 38) ||
    (action.key === "ArrowDown" && action.keyCode === 40) ||
    (action.key === "ArrowRight" && action.keyCode === 39) ||
    (action.key === "ArrowLeft" && action.keyCode === 37)
  ) {
    gameExecution(action);
  }
}

document.getElementById("gameOver_page").style.display = "none";

let playerName = getFromLocalStorage("Name");
let playerScore = parseInt(getFromLocalStorage(`${playerName}.Score`));
let PlayerBestScore = getFromLocalStorage(`${playerName}.BestScore`);

player.name = playerName;
player.score = playerScore;
player.bestScore = PlayerBestScore;

getCellsValueFromLocalStorage();
cellsColor();
player.playerName("player_name");
player.playerAvatar("player_avatar");
player.playerScore();
gameBackgroundImages();

let homePageURL =
  "http://127.0.0.1:5500/2048_v1.6_(Final_Version)/Home_Page.html";

document.getElementById("home").addEventListener("click", () => {
  window.location.href = homePageURL;
});

document.getElementById("go_home").addEventListener("click", () => {
  window.location.href = homePageURL;
});

document.getElementById("new_game").addEventListener("click", () => {
  resetCellsValueAtStart();
  addToLocalStorage(`${player.name}.Score`, 0);
  location.reload();
});

document.getElementById("go_new_game").addEventListener("click", () => {
  document.getElementById("gameOver_page").style.display = "none";
  resetCellsValueAtStart();
  addToLocalStorage(`${player.name}.Score`, 0);
  location.reload();
});

buttons[0].addEventListener("click", gameExecution);
buttons[1].addEventListener("click", gameExecution);
buttons[2].addEventListener("click", gameExecution);
buttons[3].addEventListener("click", gameExecution);

document.addEventListener("keyup", onArrowsKeyUp);
