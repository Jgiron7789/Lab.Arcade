let turnSelector = Math.floor(Math.random() * 2 + 1);
console.log(turnSelector);

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winList = document.querySelector('#winnerCounter');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${turnSelector} goes first`;
    running = true;
}

function setPlayerName () {
    let playerNameDiv = document.getElementById('playerNameWrapper');
    
    playerNameDiv.innerHTML = document.getElementById('playerNameInput').value;

    document.getElementById('playerNameInput').style.display = 'none';
    document.getElementById('setButton').style.display = 'none';
}

function setPlayerTwoName () {
    let playerTwoNameDiv = document.getElementById('playerTwoNameWrapper');
    
    playerTwoNameDiv.innerHTML = document.getElementById('playerTwoNameInput').value;

    document.getElementById('playerTwoNameInput').style.display = 'none';
    document.getElementById('setButtonTwo').style.display = 'none';
}

function clearInput(){
    let getValue = document.getElementById("playerNameInput");
    if (getValue.value != "") {
        getValue.value = "";
        document.getElementById('playerNameInput').style.display = 'inline';
        document.getElementById('setButton').style.display = 'inline';
    }
}
function clearInputTwo(){
    let getValue = document.getElementById("playerTwoNameInput");
    if (getValue.value != "") {
        getValue.value = "";
        document.getElementById('playerTwoNameInput').style.display = 'inline';
        document.getElementById('setButtonTwo').style.display = 'inline';
    }
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    
    statusText.textContent = `Player ${turnSelector} goes first`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    turnSelector = Math.floor(Math.random() * 2 + 1);
}
