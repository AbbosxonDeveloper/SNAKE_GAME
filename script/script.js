let blockSize = 18;
let rows = 18;

let cols = 15;
let board;
let context;

let snakeX =  blockSize * 5;
let snakeY =  blockSize * 5;

let foodX = blockSize * 10;
let foodY = blockSize * 10

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let gameOver = false;

let box = document.getElementById("gameover__box")
console.log(box);

let score = document.getElementById("score")
let zero = -1

let ktop = document.getElementById("keytop")
let kleft = document.getElementById("keyleft")
let kright = document.getElementById("keyright")
let kbottom = document.getElementById("keybottom")

const buttonArr = [ktop, kleft, kright, kbottom]

for (let i of buttonArr) {
    i.onclick = function() {
        changeDirection({code: i.value})
    }
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 120)
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function update() {
    if(gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle= "pink";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placefood();
    }

    for(let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle= "lime"
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        box.style.visibility = "visible";
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            box.style.visibility = "visible";

        }
    }
}

function placefood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    zero ++
    score.innerHTML = zero
}