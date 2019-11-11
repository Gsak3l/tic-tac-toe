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
    originalBoard = Array.from(Array(9).keys()); //this creates
    //an array of 9 elements, and it assigns values to this array
    //from 0 to 9. ex. Array[0]: 0, Array[1]: 1...
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof originalBoard[square.target.id] == 'number') {
        turn(square.target.id, humanPlayer)
        if (!checkTie()) turn(bestSpot(), aiPlayer);
    }
}

function turn(squareId, player) {
    originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(originalBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
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
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            /*if win.every element in that 0, 1, 2, we are gonna check
            if plays.indexOf elem is greater than -1
            basically we are asking if the player has played all the 
            spots available, so he can win (the winCombos array)*/
            gameWon = {
                index: index,
                player: player
            };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        //going threw every index of that winCombo
        document.getElementById(index).style.backgroundColor =
            gameWon.player == humanPlayer ? "#a0ffcc" : "#ff8981";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humanPlayer ? "You Win!" : "You Lose.");
}

function emptySquares() {
    return originalBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "#a7ff71";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}