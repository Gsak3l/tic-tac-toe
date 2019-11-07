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
    let gameWon = checkWin(originalBoard, player);
    if (gameWon) gameOver(gamwWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    /*the reduce method goes threw every element of the
    board array and gives back one single value in this case.
    In this method, the a(ccumulator) is the value that we will get back
    and we are going to initialize the a to an empty array.
    the e is the element in the board array, that we are going 
    threw, and the i is the index. So if the element equals the player
    then we are going to contact i. That just means that we are gonna
    take the accimilator array, and we are going to add the index (i) to
    that array, and then if e doesn't equal player, we are just gonna
    return the accumulator just as it was so we are not going to add
    anything to the accumulator.
    */
    //this is just a way to find every index that the player has played in
}