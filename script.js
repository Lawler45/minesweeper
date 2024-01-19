const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 10;
const maxScore = 5;
const bombsList = [];

let score = 0;

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, "0");

  if (score === maxScore) {
    endGame(true);
  }
}

function handleRightClick(event, cell, index) {
  event.preventDefault();
  addFlag(cell);
}

function addFlag(cell) {
  if (
    !cell.classList.contains("cell-clicked") &&
    !cell.classList.contains("cell-flag")
  ) {
    cell.classList.add("cell-flag");
  } else if (cell.classList.contains("cell-flag")) {
    cell.classList.remove("cell-flag");
  }
}

for (let i = 1; i <= totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      endGame(false);
    }
    cell.classList.add("cell-clicked");
    updateScore();
  });

  cell.addEventListener("contextmenu", function (event) {
    handleRightClick(event, cell, i);
  });

  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU </BR> WON";
    endGameScreen.classList.add("win");
  }

  endGameScreen.classList.remove("hidden");
}

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});
