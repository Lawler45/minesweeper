const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 90;
const maxScore = 5;
const bombsList = [];  // Fixed typo here

let score = 0;

for (let i = 1; i <= 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}