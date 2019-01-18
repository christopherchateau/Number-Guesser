let guess = document.querySelector(".guess");
let result = document.querySelector(".result");
let scoreSpan = document.querySelector(".score-span");
let lastGuessNum = document.querySelector(".last-guess-num");
let lastGuessWas = document.querySelector(".last-guess-was");
let changeMinVal = document.querySelector(".change-min-val");
let changeMaxVal = document.querySelector(".change-max-val");

let guessButton = document.querySelector(".guess-button");
let clearButton = document.querySelector(".clear-button");
let resetButton = document.querySelector(".reset-button");
let submitButton = document.querySelector(".submit-button");

let minVal = 1;
let maxVal = 100;
let counter = 0;
let scoreCount = 0;
let guessedNums = [];
let num;
let parsedMin;
let parsedMax;

changeMinVal.addEventListener("keyup", buttonStatusChecker);
changeMaxVal.addEventListener("keyup", buttonStatusChecker);

guess.addEventListener("keyup", function() {
  if (guess.value.length) {
    buttonOn(".guess-button");
    buttonOn(".clear-button");
  } else {
    buttonOff(".guess-button");
    buttonOff(".clear-button");
  }
});

guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  counter++;

  let parsedGuess = parseInt(guess.value);

  lastGuessNum.innerText = parsedGuess;
  lastGuessWas.innerText = "Your last guess was";

  if (!numberChecker(guess.value)) {
    scoreCount--;
    notANumber();
  } else if (parsedGuess < minVal || parsedGuess > maxVal) {
    scoreCount--;
    lastGuessNum.innerText = "!";
    result.innerText = "That's outside the range!";
  } else if (parsedGuess === num) {
    winnerRangeExpander();
  } else if (guessedNums.indexOf(parsedGuess) !== -1 && counter > 0) {
    scoreCount--;
    result.innerText = "You already guessed that number!";
  } else if (parsedGuess < num) {
    result.innerText = "That is too low";
  } else if (parsedGuess > num) {
    result.innerText = "That is too high";
  }
  if (numberChecker(guess.value)) {
    guessedNums.push(parsedGuess);
  }
  buttonOn(".reset-button");
  updateScore();
});

clearButton.addEventListener("click", function(e) {
  e.preventDefault();

  if (counter === 0) {
    buttonOff(".reset-button");
  }
  buttonOff(".guess-button");
  buttonOff(".clear-button");
  buttonOff(".submit-button");

  clearFields();
  buttonStatusChecker();
});

submitButton.addEventListener("click", function(e) {
  e.preventDefault();

  parsedMin = parseInt(changeMinVal.value);
  parsedMax = parseInt(changeMaxVal.value);

  if (
    !numberChecker(changeMinVal.value) ||
    !numberChecker(changeMaxVal.value)
  ) {
    notANumber();
  } else if (parsedMin >= parsedMax) {
    result.innerText = "Invalid Range!";
  } else {
    rangeAdjusted();
  }
});

resetButton.addEventListener("click", function(e) {
  e.preventDefault();
  minVal = 1;
  maxVal = 100;
  scoreCount = 0;

  result.innerText = "Between " + minVal + " and " + maxVal;

  buttonOff(".guess-button");
  buttonOff(".reset-button");
  buttonOff(".clear-button");
  buttonOff(".submit-button");

  resetBoard();
  updateScore();
  clearFields();

  emptyGuessNumsArray();
  updatePlaceHolders("Min", "Max");
  randomNumberGenerator(maxVal, minVal);
});

function buttonStatusChecker() {
  if (
    guess.value.length > 0 ||
    changeMinVal.value.length > 0 ||
    changeMaxVal.value.length > 0
  ) {
    buttonOn(".clear-button");
  } else {
    buttonOff(".clear-button");
  }
  if (changeMinVal.value == "" || changeMaxVal.value == "") {
    buttonOff(".submit-button");
  } else {
    buttonOn(".submit-button");
  }
}

function numberChecker(input) {
  return parseInt(input) != input || !parseInt(input).length;
}

function notANumber() {
  lastGuessNum.innerText = "!";
  result.innerText = "That's not a number!";
}

function rangeAdjusted() {
  minVal = parsedMin;
  maxVal = parsedMax;

  result.innerText = "Range updated from " + minVal + " to " + maxVal + "!";

  buttonOn(".reset-button");
  resetBoard();
  clearFields();
  emptyGuessNumsArray();
  buttonStatusChecker();
  updatePlaceHolders(minVal, maxVal);
  randomNumberGenerator(minVal, maxVal);
  buttonOff(".guess-button");
}

function winnerRangeExpander() {
  maxVal += 10;
  minVal -= 10;
  scoreCount += 10;

  lastGuessWas.innerText = "BOOM!!!";
  result.innerText =
    "Number range expanded from " + minVal + " to " + maxVal + "!";

  buttonOff(".guess-button");
  bonusPoints();
  emptyGuessNumsArray();
  buttonStatusChecker();
  clearFields();
  updatePlaceHolders(minVal, maxVal);
  randomNumberGenerator(maxVal, minVal);
  buttonOff(".clear-button");
}

function bonusPoints() {
  if (guessedNums.length <= 5) {
    scoreCount += 20;
    lastGuessWas.innerText = "BOOM!!! You got 20 bonus points!";
  } else if (guessedNums.length <= 10) {
    scoreCount += 10;
    lastGuessWas.innerText = "BOOM!!! You got 10 bonus points!";
  }
  updateScore();
}

function updatePlaceHolders(min, max) {
  document.querySelector(".change-min-val").placeholder = min;
  document.querySelector(".change-max-val").placeholder = max;
}

function clearFields() {
  document.querySelector(".guess").value = "";
  document.querySelector(".change-min-val").value = "";
  document.querySelector(".change-max-val").value = "";
}

function resetBoard() {
  lastGuessWas.innerText = "Guess a number";
  lastGuessNum.innerText = "0";
}

function resetScore() {
  scoreCount = 0;
}

function updateScore() {
  scoreSpan.innerText = scoreCount;
}

function buttonOn(button) {
  document.querySelector(button).disabled = false;
}

function buttonOff(button) {
  document.querySelector(button).disabled = true;
}

function emptyGuessNumsArray() {
  guessedNums = [];
}

function randomNumberGenerator() {
  num = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
}

randomNumberGenerator();
