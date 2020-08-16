var numSquares = 6;
var colors;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setUpModeButtons(); // build the button modes
    
    setUpSquares(); // build the squares

    reset(); // reset everything
}

// sets up all button functionality
function setUpModeButtons(){
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

// builds all the squares
function setUpSquares(){
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor); // make all squares the correct color
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

// resets all game functionality
function reset() {
    // generate a random color for the number of squares
    colors = generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    // resets "Play Again?" to "New Colors"
    resetButton.textContent = "New Colors";
    // Clears "Try Again?" or "Correct" span to empty str
    messageDisplay.textContent = "";
    // change colors of squares
    for (let i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelBlue";
    
}

// Call reset() when the New Game button is clicked
resetButton.addEventListener("click", function() {
    reset();
});

// generate a new set of colors for all squares
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

// picks a random color from the array 
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// generates an array of colors where the length of the array
// is equal to num (3 or 6)
function generateRandomColors(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(randomColor())      
    }

    return arr;
}

// creates an rgb string with random values
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}