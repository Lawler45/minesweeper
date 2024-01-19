const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 20;
const maxScore = 40;
const bombsList = [];

let score = 0;

//GAME FUNCTIONS

while (bombsList.length < totalBombs) {
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

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

function countNeighbourBombs(cellIndex) {
  const neighbours = [-11, -10 - 9, -1, 1, 9, 10, 11];

  return neighbours.filter((neighbour) =>
    bombsList.includes(cellIndex + neighbour)
  ).length;
}

function revealAllBombs() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
    }
  }
}

//GAME FUNCTIONAILITY
for (let i = 1; i <= totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      endGame(false);
    } else {
      const neighbourBombCount = countNeighbourBombs(i);
      if (neighbourBombCount > 0) {
        cell.innerText = neighbourBombCount;
        if (cell.innerText <= 2) {
          cell.classList.add("cell-number-low");
        } else if (cell.innerText === 3) {
          cell.classList.add("cell-number-medium");
        } else {
          cell.classList.add("cell-number-high");
        }
      }
    }
    cell.classList.add("cell-clicked");
    updateScore();
  });

  cell.addEventListener("contextmenu", function (event) {
    handleRightClick(event, cell, i);
  });

  grid.appendChild(cell);
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU </BR> WON";
    endGameScreen.classList.add("win");
  }

  revealAllBombs();
  endGameScreen.classList.remove("hidden");
}

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});
