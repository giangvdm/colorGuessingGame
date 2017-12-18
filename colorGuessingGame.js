var randomColorPool = []; // The pool storing random choices of color
var correctColor; // The one and only correct choice of color
var colorChoices = document.getElementsByClassName("color-choice"); // The squares that hold each color in the pool
var messageDisplay = document.getElementById("message-display"); // Message display area
var difficulty = 6; // default = medium
var difficultyDisplay = document.getElementById("difficulty-display"); // Where difficulty is shown
var resetButton = document.querySelector("button#reset"); // New Color/Reset button
var cycleDifficultyButton = document.querySelector("button#cycle-difficulty"); // Set difficutly button

/* ******** */
/* Prepare everything */
// Reset button: reset everything, start a new game when clicked
resetButton.addEventListener("click", function() {
    reset(); // simply reset everything
});

// Cycle difficulty
cycleDifficultyButton.addEventListener("click", function() {
    difficulty = cycleDifficulty(); // cycle difficulty
    showDifficulty(); // show it
    reset(); // AND reset the game
    // Hide the redundant squares (works for difficulty = easy/medium)
    hideRedundantChoices();
});
/* Done preparing */
/* ******** */


/* ******** */
/* First-time load */
// Show current difficulty
showDifficulty();

// Hide the last 3 redundant choices since difficulty is currently hard-coded to 6
// Please comment this function out when difficulty is hard-coded to 9
hideRedundantChoices();

// Initiate the colors pool
randomColorPool = initPool();

// Pick the one correct choice of color
var randomNumber = Math.floor(Math.random() * randomColorPool.length);
correctColor = randomColorPool[randomNumber];

// Display the correct color which the play has to pick
document.getElementById("color-display").textContent = correctColor;

// Initiate choices of color
initChoices();

/* Done loading */
/* and then the game is ready to start */
/* ******** */


/* ******** */
/* Functions */

// Generate a random RGB color
function generateAColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgbCode = "rgb" + "(" + r + ", " + g + ", " + b + ")";
    return rgbCode;
}

// Generate a specific number of colors based on the game's difficulty
function initPool() {
    var arr = [];
    for (var i = 0; i < difficulty; i++) {
        arr[i] = generateAColor();
    }
    return arr;
}

// Initiate choices of color
function initChoices() {
    for (var i = 0; i < randomColorPool.length; i++) {
        // initiate color for each choice
        colorChoices[i].style.backgroundColor = randomColorPool[i];

        // add eventListener for each choice
        colorChoices[i].addEventListener("click", function () {
            var clicked = this.style.backgroundColor; // grab the clicked color
            if (clicked === correctColor) { // player picked the correct color
                changeColor(correctColor, "white"); // change all background color to the correct one
                // modify message and button text
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play again?";
            }
            else { // picked an incorrect one
                this.classList.add("wrong"); // make the wrong color fade
                // show message
                messageDisplay.textContent = "Try again!";
            }
        });
    }
}

// Change the color in specific areas when the play has picked the correct color
function changeColor(bgcolor, txtcolor) {
    // header background and text color
    var header = document.getElementById("header");
    header.style.backgroundColor = bgcolor;
    header.style.color = txtcolor;

    // and all other (wrong) choices' background color
    for (var i = 0; i < colorChoices.length; i++) {
        colorChoices[i].classList.remove("wrong"); // make wrong choices visible from the background again
        colorChoices[i].style.backgroundColor = bgcolor; // give every wrong choices the color of the correct one
    }
}

// Reset everything; called when clicked on New Color button or Difficulty buttons
function reset() {
    // initiate a whole new random colors pool
    randomColorPool = initPool();

    // pick the correct choice of color
    var randomNumber = Math.floor(Math.random() * randomColorPool.length);
    correctColor = randomColorPool[randomNumber];
    
    // display the correct color which the play has to pick
    document.getElementById("color-display").textContent = correctColor;

    // change header background and text color, and make wrong choices visible again
    changeColor("rgb(202, 179, 136)", "#333"); // #333 = bootstrap default text color

    // restore default text
    messageDisplay.textContent = "Pick your guess"; // restore text in message display area
    resetButton.textContent = "New Color"; // restore text in New Color/Reset button

    // Initiate choices of color
    initChoices();
}

// Cycle among easy (3), medium (6) and hard (9)
function cycleDifficulty() {
    if (difficulty === 3) {
        return 6;
    }
    else if (difficulty === 6) {
        return 9;
    }
    else return 3;
}

// Show difficulty
function showDifficulty() {
    if (difficulty === 3) {
        difficultyDisplay.textContent = "Easy";
    }
    else if (difficulty === 6) {
        difficultyDisplay.textContent = "Medium";
    }
    else difficultyDisplay.textContent = "Hard";
}

// Hide redundant choices, works for easy and medium modes when there are only 3 or 6 instead of full 9
function hideRedundantChoices() {
    if (difficulty === 3) {
        for (var i = 3; i < 9; i++) {
            colorChoices[i].style.visibility = "hidden"; // just hide the last 6 choices
        }
    }
    else if (difficulty === 6) {
        for (var i = 3; i < 6; i++) {
            colorChoices[i].style.visibility = "visible"; // show the choices #3 to #6
        }
        for (var i = 6; i < 9; i++) {
            colorChoices[i].style.visibility = "hidden"; // hide the last 3
        }
    }
    else {
        for (var i = 0; i < 9; i++) {
            colorChoices[i].style.visibility = "visible"; // show all choices
        }
    }
}

/* End of Functions list */
/* ******** */

/* End of document */
/* ******** */