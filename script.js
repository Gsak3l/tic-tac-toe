var originalBoard;
const humanPlayer = 'O';
const aiPlayer = 'X'
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    originalBoard = Array.from(Array(9).keys); //this creates
    //an array of 9 elements, and it assigns values to this array
    //from 0 to 9. ex. Array[0]: 0, Array[1]: 1...
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}
function turnClick(square) {
    turn(square.target.id, humanPlayer);
}

function turn(squareId, player) {
    originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
}