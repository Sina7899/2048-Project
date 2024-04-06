import { player } from "./Fixed_Variables_Objects.js";
import { gameBackgroundImages } from "./API_Functions.js";
import { resetCellsValueAtStart } from "./Game_Functions.js";
import {
  addToLocalStorage,
  getFromLocalStorage,
  getKeyByValue,
  localStorageKeyValues,
  changeURL,
} from "./URL_&_LocalStorage.js";

document.getElementById("player_profile").hidden = true;
document.getElementById("player_avatar").hidden = true;
document.getElementById("player_name").hidden = true;

function leaderBoardScores() {
  let keyValues = localStorageKeyValues();
  let allScores = [];
  let bestScoresPlayerName = [];
  let bestScores = [];

  for (let i = 0; i < keyValues.length; i++) {
    if (keyValues[i][0].includes(".BestScore")) {
      allScores.push(parseInt(keyValues[i][1]));
    }
  }

  allScores.sort((a, b) => b - a);

  for (let j = 0; j < allScores.length; j++) {
    if (allScores[j] !== allScores[j + 1] && allScores[j] != 0) {
      bestScores.push(allScores[j]);
      bestScores.splice(5, bestScores.length - 1);
    }
  }

  for (let p = 0; p < bestScores.length; p++) {
    let bestScoresKeys = getKeyByValue(`${bestScores[p]}`);
    if (bestScoresKeys.includes(".BestScore")) {
      bestScoresPlayerName.push(
        getKeyByValue(`${bestScores[p]}`).slice(0, -10)
      );
    } else if (bestScoresKeys.includes(".Score")) {
      bestScoresPlayerName.push(getKeyByValue(`${bestScores[p]}`).slice(0, -6));
    }
    let li = document.createElement("li");
    li.innerText = bestScoresPlayerName[p];
    let span = document.createElement("span");
    span.innerText = bestScores[p];
    document.getElementById("list_name").appendChild(li);
    document.getElementById("lb_score").appendChild(span);
  }
}

function onInputKeyUp(event) {
  if (event.key === "Enter" && event.keyCode === 13) {
    player.name = document.getElementById("input_name").value;
    document.getElementById("input_name").value = "";
    addToLocalStorage("Name", player.name);
    addToLocalStorage(`${player.name}.Score`, 0);
    player.playerName("player_name");
    player.playerAvatar("player_avatar");
    document.getElementById("player_profile").hidden = false;
    document.getElementById("player_avatar").hidden = false;
    document.getElementById("player_name").hidden = false;
    if (!localStorage.hasOwnProperty(`${player.name}.BestScore`)) {
      addToLocalStorage(`${player.name}.BestScore`, 0);
    }
  }
}

gameBackgroundImages();

leaderBoardScores();

resetCellsValueAtStart();

document.getElementById("input_name").addEventListener("keyup", onInputKeyUp);

document.getElementById("start_butt").addEventListener("click", () => {
  if (document.getElementById("player_name").innerText == "") {
    alert("Please Enter Your Name First!");
  } else {
    window.location.href = changeURL(
      "2048_v1.6_(Final_Version)/Game_Page.html",
      getFromLocalStorage("Name")
    );
  }
});
