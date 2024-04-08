// Taking value from HTML
let boxes = document.querySelectorAll(".Box");
let resetBtn = document.querySelector("#reset-game");
let newGameBtn = document.querySelector(".newGame");
let msg = document.querySelector(".msg");
let drawMsg = document.querySelector(".drawmsg");
let score1 = document.querySelector("#player1");
let score2 = document.querySelector("#player2");

// Initialize variables value
let turnX = true;
let count = 0;
let P1score = 0;
let P2score = 0;

// Win patterns
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

// For reset game 
const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msg.classList.add("hide");
    newGameBtn.classList.add("hide");
    drawMsg.classList.add("hide");

};

// Fill boxes with 'X' & 'O'
boxes.forEach( (box) => {
    box.addEventListener("click", () => {
    if (turnX) {
        box.innerText = "X";
        count++;
        turnX = false;
    }
    else{
        box.innerText = "O";
        count++;
        turnX = true;
    }
    box.disabled = true;

    checkWinner();

    });
});

// Update score function
const updateScore = (winner) => {
    if (winner === 'X') {
        P1score++;
        score1.innerText = P1score;
    } else {
        P2score++;
        score2.innerText = P2score;
    }
};

// Disable boxes when they are clicked
const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

// Enable boxes when the boxes are empty
const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show winner Message after Check
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.remove("hide");
    newGameBtn.classList.remove("hide");
    disableBoxes();
    updateScore(winner);
};

// scan Pattern to check the winner or show Draw message
const checkWinner = () => {
    let isDraw = true;
    
    for (const Pattern of winPattern) {
        let position1 = boxes[Pattern[0]].innerText;
        let position2 = boxes[Pattern[1]].innerText;
        let position3 = boxes[Pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {  
            if (position1 === position2 && position2 === position3) {
                showWinner(position1);  
                return;
            }
        }

        // If any position in a pattern is empty, it's not a draw
        if (position1 === "" || position2 === "" || position3 === "") {
            isDraw = false;
        }
    }

    // If all patterns are checked and no winner is found, it's a draw
    if (isDraw && count === 9) {
        drawMsg.innerText = "Oops!! Match is Draw";
        drawMsg.classList.remove("hide");
        disableBoxes();
    }
};

// Buttons for reset and paly again
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);