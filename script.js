let totalScores, currentScore, currentPlayer, playing;
const diceRollButton = document.querySelector(".btn--roll");
const newGameButton = document.querySelector(".btn--new");
const holdPointsButton = document.querySelector(".btn--hold");
const diceElement = document.querySelector(".dice");
const players = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1")
];

initializeGame();

// Event listeners
diceRollButton.addEventListener("click", rollDice);
holdPointsButton.addEventListener("click", holdPoints);
newGameButton.addEventListener("click", initializeGame);

function initializeGame() {
  totalScores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  diceElement.classList.add("hidden");

  // Reset UI
  updateScoreDisplay(0);
  updateScoreDisplay(1);
  updateCurrentScoreDisplay(0);
  updateCurrentScoreDisplay(1);

  // Reset player states
  players.forEach((player, index) => {
    player.classList.remove("player--winner");
    player.classList.toggle("player--active", index === currentPlayer);
  });
}

function rollDice() {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    if (dice === 1) {
      currentScore = 0;
      updateCurrentScoreDisplay(currentPlayer);
      switchPlayer();
    } else {
      currentScore += dice;
      updateCurrentScoreDisplay(currentPlayer);
    }
  }
}

function holdPoints() {
  if (playing) {
    totalScores[currentPlayer] += currentScore;
    updateScoreDisplay(currentPlayer);

    if (totalScores[currentPlayer] >= 100) {
      endGame();
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  currentScore = 0;
  updateCurrentScoreDisplay(currentPlayer);

  currentPlayer = currentPlayer === 0 ? 1 : 0;
  players.forEach((player, index) =>
    player.classList.toggle("player--active", index === currentPlayer)
  );
}

function endGame() {
  playing = false;
  players[currentPlayer].classList.add("player--winner");
  diceElement.classList.add("hidden");
}

function updateScoreDisplay(player) {
  document.getElementById(`score--${player}`).textContent = totalScores[player];
}

function updateCurrentScoreDisplay(player) {
  document.getElementById(`current--${player}`).textContent = currentScore;
}