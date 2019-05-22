var activePlayer, gamePlaying, roundScore, scores;

var DOMStrings = {
  roll: ".btn-roll",
  hold: ".btn-hold",
  current: "#current-",
  score: "#score-",
  new: ".btn-new",
  dice: "#dice-",
  name: "#name-",
  background: ".background"
};

/////////////////////////////////
///////// INITILIZATION /////////
/////////////////////////////////

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(DOMStrings.score + 0).textContent = "0";
  document.querySelector(DOMStrings.score + 1).textContent = "0";
  document.querySelector(DOMStrings.current + 0).textContent = "0";
  document.querySelector(DOMStrings.score + 1).textContent = "0";

  document.querySelector(DOMStrings.name + 0).textContent = "Player 1";
  document.querySelector(DOMStrings.name + 1).textContent = "Player 2";

  document.querySelector(DOMStrings.dice + 1).style.display = "none";
  document.querySelector(DOMStrings.dice + 2).style.display = "none";
}

init();

document.querySelector(DOMStrings.new).addEventListener("click", init);

/////////////////////////////////
////////// ROLL DICES ///////////
/////////////////////////////////

function getRandomInt() {
  return Math.floor(Math.random() * 6) + 1;
}

document.querySelector(DOMStrings.roll).addEventListener("click", function() {
  if (gamePlaying) {
    var diceNum1 = getRandomInt();
    var diceNum2 = getRandomInt();
    console.log(diceNum1);

    document.querySelector(DOMStrings.dice + 1).style.display = "block";
    document.querySelector(DOMStrings.dice + 2).style.display = "block";

    document.querySelector(DOMStrings.dice + 1).src =
      "img/dice-" + diceNum1 + ".png";

    document.querySelector(DOMStrings.dice + 2).src =
      "img/dice-" + diceNum2 + ".png";

    if (diceNum1 !== 1 || diceNum2 !== 1) {
      roundScore += diceNum1 + diceNum2;
      document.querySelector(
        DOMStrings.current + activePlayer
      ).textContent = roundScore;
    } else {
      scores[activePlayer] = 0;
      document.querySelector(DOMStrings.score + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    }
  }
});

/////////////////////////////////
///////// HOLD DICES /////////
/////////////////////////////////

document.querySelector(DOMStrings.hold).addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector(DOMStrings.score + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.querySelector(DOMStrings.name + activePlayer).textContent =
        "Winner!";
      document.querySelector(DOMStrings.dice + 1).style.display = "none";
      document.querySelector(DOMStrings.dice + 2).style.display = "none";
    } else {
      nextPlayer();
    }
  }
});

var nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector(DOMStrings.current + 0).textContent = "0";
  document.querySelector(DOMStrings.current + 1).textContent = "0";
};

const timeDisplay = new Date().getHours();
console.log(timeDisplay);

if (timeDisplay >= 6 && timeDisplay <= 18) {
  document.querySelector(DOMStrings.background).style.backgroundImage =
    "url(img/firewatch-5120x2880-sunset-ps4-pc-5k-1776.jpg)";
} else {
  document.querySelector(DOMStrings.background).style.background =
    "url(img/nastya-friday-game-background-3.jpg)";
}
