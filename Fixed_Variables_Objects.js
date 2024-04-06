import { addToLocalStorage } from "./URL_&_LocalStorage.js";

const cellsId = [
  "cell_1",
  "cell_2",
  "cell_3",
  "cell_4",
  "cell_5",
  "cell_6",
  "cell_7",
  "cell_8",
  "cell_9",
  "cell_10",
  "cell_11",
  "cell_12",
  "cell_13",
  "cell_14",
  "cell_15",
  "cell_16",
];

let gameBoardStructure = {
  rows: {
    row_1: ["cell_1", "cell_2", "cell_3", "cell_4"],
    row_2: ["cell_5", "cell_6", "cell_7", "cell_8"],
    row_3: ["cell_9", "cell_10", "cell_11", "cell_12"],
    row_4: ["cell_13", "cell_14", "cell_15", "cell_16"],
  },
  columns: {
    column_1: ["cell_1", "cell_5", "cell_9", "cell_13"],
    column_2: ["cell_2", "cell_6", "cell_10", "cell_14"],
    column_3: ["cell_3", "cell_7", "cell_11", "cell_15"],
    column_4: ["cell_4", "cell_8", "cell_12", "cell_16"],
  },
};

class Player_Info {
  constructor(name, score, bestScore) {
    this.name = name;
    this.score = score;
    this.bestScore = bestScore;
    this.scoresGot = [];
  }

  playerName(id) {
    document.getElementById(id).innerText = this.name;
  }

  playerScore() {
    let playerScoresGotInEachMove = this.scoresGot;
    for (let p = 0; p < playerScoresGotInEachMove.length; p++) {
      this.score += playerScoresGotInEachMove[p];
      this.scoresGot = [];
    }

    document.getElementById("score").innerText = this.score;
    addToLocalStorage(`${this.name}.Score`, this.score);

    if (this.score >= this.bestScore) {
      this.bestScore = this.score;
      document
        .getElementById("player_avatar")
        .classList.add("avatar_animation");
    }
    document.getElementById("best").innerText = this.bestScore;
    addToLocalStorage(`${this.name}.BestScore`, this.bestScore);
  }

  playerAvatar(id) {
    const variant = "beam";
    const size = 52;
    const colors = "2473ce,6aa5e7,062f64";
    let avatarURL = `https://source.boringavatars.com/${variant}/${size}/${this.name}?colors=${colors}`;

    document.getElementById(id).src = avatarURL;
  }
}

let player = new Player_Info();

const primeNumbers = [2, 4];

const buttons = document.querySelectorAll(".game_button");

let lastTwoCellsValueLog = [];

export {
  cellsId,
  gameBoardStructure,
  Player_Info,
  primeNumbers,
  buttons,
  player,
  lastTwoCellsValueLog,
};
