const min = 1;
const max = 100;
let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

/* or simply by
let randomNumber  =parseInt(Math.random() *100 +1);

console.log(randomNumber); */

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGues = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("please enter a valid number");
  } else if (guess < 1) {
    alert("please enter number in b/w 1-100.");
  } else if (guess > 100) {
    alert("please enter number in b/w 1-100.");
  } else {
    prevGues.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMessage(`Game Over. Rnadom number was ${randomNumber}.`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right.`);
    endGame();
  } else if (guess < randomNumber - 10) {
    displayMessage(`Toooo Lowwww...!!!`);
  } else if (guess > randomNumber - 10 && guess < randomNumber) {
    displayMessage(`too loww.`);
  } else if (guess > randomNumber + 10) {
    displayMessage(`Toooooo Highhhhhh..!!!`);
  } else if (guess < randomNumber + 10 && guess > randomNumber) {
    displayMessage(`too highh..`);
  }
}

function displayGuess(guess) {
  userInput.value = " ";
  guessSlot.innerHTML += `<${guess}>, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = ' <h2 id="newGame">Start new game.</h2>';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    prevGues = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
