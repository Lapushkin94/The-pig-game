let totalScore0;
let totalScore1;
let currentScore;
let currentPlayer;
let playing;
const diceRollButton = document.querySelector(".btn--roll");
const newGameButton = document.querySelector(".btn--new");
const holdPointsButton = document.querySelector(".btn--hold");
const diceElement = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

newGame();

diceRollButton.addEventListener("click", diceRoll);
holdPointsButton.addEventListener("click", holdPoints);
newGameButton.addEventListener("click", newGame);

function holdPoints() {
  if (playing) {
    if (currentPlayer === 0) {
      totalScore0 += currentScore;
      document.getElementById(`score--${currentPlayer}`).textContent =
        totalScore0;
    } else {
      totalScore1 += currentScore;
      document.getElementById(`score--${currentPlayer}`).textContent =
        totalScore1;
    }

    if (totalScore0 >= 100) {
      playing = false;
      player0.classList.add("player--winner");
      diceElement.classList.add("hidden");
      return;
    } else if (totalScore1 >= 100) {
      playing = false;
      player1.classList.add("player--winner");
      diceElement.classList.add("hidden");
      return;
    }

    switchPlayer();
  }
}

function diceRoll() {
  if (playing) {
    diceElement.classList.remove("hidden");
    let dice = Math.floor(Math.random() * 6) + 1;

    diceElement.src = `dice-${dice}.png`;

    if (dice === 1) {
      currentScore = 0;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      switchPlayer();
      return;
    }

    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  }
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  if (currentPlayer === 0) {
    currentPlayer = 1;
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
  } else {
    currentPlayer = 0;
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
  }
}

function newGame() {
  totalScore0 = 0;
  totalScore1 = 0;
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  diceElement.classList.add("hidden");

  document.getElementById("score--0").textContent = totalScore0;
  document.getElementById("score--1").textContent = totalScore1;
  document.getElementById("current--0").textContent = currentScore;
  document.getElementById("current--1").textContent = currentScore;
}
