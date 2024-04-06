import {
  cellsId,
  primeNumbers,
  gameBoardStructure,
  player,
  lastTwoCellsValueLog,
} from "./Fixed_Variables_Objects.js";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "./URL_&_LocalStorage.js";

function emptyCells() {
  let emptyCell = [];

  cellsId.forEach((cell) => {
    if (document.getElementById(cell).innerText == "") {
      emptyCell.push(cell);
    }
  });
  return emptyCell;
}

function cellsValues() {
  let allCellsValue = [];

  for (let o = 0; o < cellsId.length; o++) {
    allCellsValue.push(document.getElementById(cellsId[o]).innerText);
  }
  return allCellsValue;
}

function cellsIdAndValues() {
  let allCellsIdAndValue = [];

  for (let o = 0; o < cellsId.length; o++) {
    allCellsIdAndValue.push([
      cellsId[o],
      document.getElementById(cellsId[o]).innerText,
    ]);
  }
  return allCellsIdAndValue;
}

function setRandomCellsNumberAtBegin() {
  let alternatesCellId = cellsId.slice();

  let firstCell = document.getElementById(
    alternatesCellId[Math.floor(Math.random() * alternatesCellId.length)]
  );

  firstCell.innerText =
    primeNumbers[Math.floor(Math.random() * primeNumbers.length)];

  alternatesCellId.splice(alternatesCellId.indexOf(firstCell.id), 1);

  document.getElementById(
    alternatesCellId[Math.floor(Math.random() * alternatesCellId.length)]
  ).innerText = primeNumbers[Math.floor(Math.random() * primeNumbers.length)];
}

function setRandomCellsNumber() {
  let emptyCell = emptyCells();
  let cellsValue = cellsValues();

  lastTwoCellsValueLog.push(cellsValue);
  if (lastTwoCellsValueLog.length > 2) {
    lastTwoCellsValueLog.splice(0, 1);
  }

  if (
    lastTwoCellsValueLog[0].length === cellsValue.length &&
    lastTwoCellsValueLog[0].every(
      (element, index) => element === cellsValue[index]
    )
  ) {
    console.log("can not move");
  } else {
    let randomCellId = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    let randomValue =
      primeNumbers[Math.floor(Math.random() * primeNumbers.length)];

    document.getElementById(randomCellId).innerText = randomValue;

    lastTwoCellsValueLog[1].splice(
      parseInt(randomCellId.slice(5)) - 1,
      1,
      `${randomValue}`
    );
  }

  if (cellsValue.includes("")) {
    return;
  } else {
    let endGameIndicator = 0;

    for (let p = 0; p < cellsValue.length; p++) {
      if (cellsValue[p] == cellsValue[p + 1]) {
        if (p == 3 || p == 7 || p == 11 || p == 15) {
          continue;
        }
        endGameIndicator += 1;
      } else if (cellsValue[p] == cellsValue[p + 4]) {
        endGameIndicator += 1;
      }
    }

    if (endGameIndicator == 0) {
      gameOverPage();

      if (
        document.getElementById("score").innerText ==
        document.getElementById("best").innerText
      ) {
        document.getElementById("new_best").style.display = "block";
      }
      document.getElementById("gameOver_page").style.display = "flex";
      document
        .getElementById("go_player_avatar")
        .classList.add("avatar_animation");
      console.log("Game Over!");
    }
  }
}

function forDownToUpAndRightToLeftMoves(rowsOrColumn) {
  let initialValues = [];
  let realValues = [];
  let mergedValue = "";

  for (let i = 0; i < rowsOrColumn.length; i++) {
    if (document.getElementById(rowsOrColumn[i]).innerText != "") {
      initialValues.push(document.getElementById(rowsOrColumn[i]).innerText);
    }
  }

  for (let t = 0; t < initialValues.length; t++) {
    if (initialValues[t] == initialValues[t + 1]) {
      mergedValue = parseInt(initialValues[t]) + parseInt(initialValues[t + 1]);
      player.scoresGot.push(mergedValue);
      initialValues[t] = `${mergedValue}`;
      initialValues[t + 1] = "";
    }

    if (initialValues[t] != "") {
      realValues.push(initialValues[t]);
    }
  }

  for (let k = 0; k < realValues.length; k++) {
    document.getElementById(rowsOrColumn[k]).innerText = realValues[k];
  }

  for (let j = rowsOrColumn.length - 1; j > realValues.length - 1; j--) {
    document.getElementById(rowsOrColumn[j]).innerText = "";
  }
}

function forUpToDownAndLeftToRightMoves(rowsOrColumn) {
  let emptyCells = [];
  let initialValues = [];
  let realValues = [];
  let mergedValue = "";

  for (let i = 0; i < rowsOrColumn.length; i++) {
    if (document.getElementById(rowsOrColumn[i]).innerText != "") {
      initialValues.push(document.getElementById(rowsOrColumn[i]).innerText);
    }
  }

  for (let t = initialValues.length - 1; t >= 0; t--) {
    if (initialValues[t] == initialValues[t - 1]) {
      mergedValue = parseInt(initialValues[t]) + parseInt(initialValues[t - 1]);
      initialValues[t] = `${mergedValue}`;
      player.scoresGot.push(mergedValue);
      initialValues[t - 1] = "";
      emptyCells.push("");
    }

    if (initialValues[t] != "") {
      realValues.unshift(initialValues[t]);
    }
  }

  for (let j = 0; j < rowsOrColumn.length; j++) {
    if (document.getElementById(rowsOrColumn[j]).innerText == "") {
      emptyCells.push("");
    }
  }

  let newAlternatesRowOrColumn = emptyCells.concat(realValues);

  for (let k = rowsOrColumn.length - 1; k >= 0; k--) {
    document.getElementById(rowsOrColumn[k]).innerText =
      newAlternatesRowOrColumn[k];
  }
}

function gameLogic(action, rowsOrColumn) {
  if (
    (rowsOrColumn == gameBoardStructure.columns.column_1 ||
      rowsOrColumn == gameBoardStructure.columns.column_2 ||
      rowsOrColumn == gameBoardStructure.columns.column_3 ||
      rowsOrColumn == gameBoardStructure.columns.column_4) &&
    (action.target.id == "up" || action.keyCode === 38)
  ) {
    forDownToUpAndRightToLeftMoves(rowsOrColumn);
  } else if (
    (rowsOrColumn == gameBoardStructure.columns.column_1 ||
      rowsOrColumn == gameBoardStructure.columns.column_2 ||
      rowsOrColumn == gameBoardStructure.columns.column_3 ||
      rowsOrColumn == gameBoardStructure.columns.column_4) &&
    (action.target.id == "down" || action.keyCode === 40)
  ) {
    forUpToDownAndLeftToRightMoves(rowsOrColumn);
  } else if (
    (rowsOrColumn == gameBoardStructure.rows.row_1 ||
      rowsOrColumn == gameBoardStructure.rows.row_2 ||
      rowsOrColumn == gameBoardStructure.rows.row_3 ||
      rowsOrColumn == gameBoardStructure.rows.row_4) &&
    (action.target.id == "left" || action.keyCode === 37)
  ) {
    forDownToUpAndRightToLeftMoves(rowsOrColumn);
  } else if (
    (rowsOrColumn == gameBoardStructure.rows.row_1 ||
      rowsOrColumn == gameBoardStructure.rows.row_2 ||
      rowsOrColumn == gameBoardStructure.rows.row_3 ||
      rowsOrColumn == gameBoardStructure.rows.row_4) &&
    (action.target.id == "right" || action.keyCode === 39)
  ) {
    forUpToDownAndLeftToRightMoves(rowsOrColumn);
  }
}

function sendCellsValueToLocalStorage() {
  let cellsValue = cellsIdAndValues();

  for (let i = 0; i < cellsId.length; i++) {
    addToLocalStorage(cellsValue[i][0], cellsValue[i][1]);
  }
}

function resetCellsValueAtStart() {
  for (let i = 0; i < cellsId.length; i++) {
    addToLocalStorage(cellsId[i], "");
  }
}

function getCellsValueFromLocalStorage() {
  let cellValues = [];

  for (let i = 0; i < cellsId.length; i++) {
    cellValues.push(getFromLocalStorage(cellsId[i]));
  }

  if (cellValues.every((x) => x == "")) {
    setRandomCellsNumberAtBegin();
    lastTwoCellsValueLog.push(cellsValues());
  } else {
    for (let k = 0; k < cellsId.length; k++) {
      document.getElementById(cellsId[k]).innerText = cellValues[k];
    }
    lastTwoCellsValueLog.push(cellsValues());
  }
}

function cellsColor() {
  let cells = cellsIdAndValues();
  for (let a = 0; a < cells.length; a++) {
    switch (cells[a][1]) {
      case "":
        document.getElementById([cells[a][0]]).className = "cell_color_default";
        break;
      case "2":
        document.getElementById([cells[a][0]]).className = "cell_color_2";
        break;
      case "4":
        document.getElementById([cells[a][0]]).className = "cell_color_4";
        break;
      case "8":
        document.getElementById([cells[a][0]]).className = "cell_color_8";
        break;
      case "16":
        document.getElementById([cells[a][0]]).className = "cell_color_16";
        break;
      case "32":
        document.getElementById([cells[a][0]]).className = "cell_color_32";
        break;
      case "64":
        document.getElementById([cells[a][0]]).className = "cell_color_64";
        break;
      case "128":
        document.getElementById([cells[a][0]]).className = "cell_color_128";
        break;
      case "256":
        document.getElementById([cells[a][0]]).className = "cell_color_256";
        break;
      case "512":
        document.getElementById([cells[a][0]]).className = "cell_color_512";
        break;
      case "1024":
        document.getElementById([cells[a][0]]).className = "cell_color_1024";
        break;
      case "2048":
        document.getElementById([cells[a][0]]).className = "cell_color_2048";
        break;
      default:
        document.getElementById([cells[a][0]]).className = "cell_color_2048";
        break;
    }
  }
}

function gameOverPage() {
  player.playerName("go_player_name");
  player.playerAvatar("go_player_avatar");

  document.getElementById("go_score").innerText = getFromLocalStorage(
    `${getFromLocalStorage("Name")}.Score`
  );
  document.getElementById("go_best").innerText = getFromLocalStorage(
    `${getFromLocalStorage("Name")}.BestScore`
  );
}

function gameExecution(action) {
  gameLogic(action, gameBoardStructure.rows.row_1);
  gameLogic(action, gameBoardStructure.rows.row_2);
  gameLogic(action, gameBoardStructure.rows.row_3);
  gameLogic(action, gameBoardStructure.rows.row_4);
  gameLogic(action, gameBoardStructure.columns.column_1);
  gameLogic(action, gameBoardStructure.columns.column_2);
  gameLogic(action, gameBoardStructure.columns.column_3);
  gameLogic(action, gameBoardStructure.columns.column_4);

  setRandomCellsNumber();

  cellsIdAndValues();

  sendCellsValueToLocalStorage("Middle of the game");

  cellsColor();

  player.playerScore();
}

export {
  setRandomCellsNumberAtBegin,
  setRandomCellsNumber,
  forDownToUpAndRightToLeftMoves,
  forUpToDownAndLeftToRightMoves,
  gameLogic,
  cellsColor,
  gameExecution,
  sendCellsValueToLocalStorage,
  getCellsValueFromLocalStorage,
  resetCellsValueAtStart,
};
