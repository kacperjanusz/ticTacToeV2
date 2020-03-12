
const player1 = 'fa-circle';
const player2 = 'fa-times-circle';
let winnerP1 = 0;
let winnerP2 = 0;

let round = 1;

let gameBoard = [["","",""],["","",""],["","",""]];


const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

const boxes = document.querySelectorAll(".box");
const turnField = document.querySelector(".turnBox");

startGame();

function startGame() {
    turnField.innerText = "PLAYER 1"

    boxes.forEach (box => box.addEventListener("click", pick));
}


function pick(event ){
    
    const { row, column} = event.target.dataset;
    const turn = round % 2 === 0 ? player1 : player2;
    if ( round % 2 === 0 ) {
     turnField.innerText = "PLAYER 1" }
     
     else 
     {
         turnField.innerHTML = "PLAYER 2";
     }

    if (gameBoard[row][column] !== "") return;
    event.target.classList.add(turn);
    round++;
    gameBoard[row][column] = turn;
        
}

function winStatus() {
    const result = gameBoard.reduce((total, row) => total.concat(row));
    let winner = null
    
    let moves = {
        "fa-circle": [],
        "fa-times-circle": [],
    }; 
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[player1].indexOf(index) > -1)) {
            winnerP2++;
            winner = 'PlAYER 1 winned ' + winnerP1 + " times, " + 'PlAYER 2 winned ' + winnerP2 + " times"  ;
            boxes.forEach (box => box.removeEventListener("click", pick));
            alert(winner);
        }
        if (combination.every(index => moves[player2].indexOf(index) > -1)) {
            winnerP1++;
            winner = 'PlAYER 1 winned ' + winnerP1 + " times, " + 'PlAYER 2 winned ' + winnerP2 + " times"  ;
            boxes.forEach (box => box.removeEventListener("click", pick));
            alert(winner);
        }
    });
}

const button = document.querySelector(".resetButton");
button.addEventListener("click", reset);

function reset(){
    boxes.forEach (box => box.classList.remove(player1, player2));
    gameBoard = [["","",""],["","",""],["","",""]];
    startGame();
    round++
    
}

