const can = document.querySelector("canvas");
const ctx = can.getContext("2d");

const cw = can.width = 500;
const ch = can.height = 500;

const tsize = 17;
const bsize = 4;
let posX = [cw / 2 + 4];
let posY = [ch / 2 + 4];
var keyCode = 119;
var lastKey = 119;

let posSpawnX;
let posSpawnY;
var isPoint = false;
let points = 1;
let bestPoints = 1;

var onKeyPress = function (e) {
    if ((keyCode == 119 && e.keyCode != 115) || (keyCode == 115 && e.keyCode != 119) || (keyCode == 100 && e.keyCode != 97) || (keyCode == 97 && e.keyCode != 100)) {
        keyCode = e.keyCode;
    }
    if (keyCode != 119 && keyCode != 115 && keyCode != 97 && keyCode != 100) {
        keyCode = lastKey;
    }
}

function map() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
    ctx.closePath();
    for (let x = 0; x <= 500; x = x + 25) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#0a0a0a";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.stroke();
        ctx.closePath();
    }
    for (let y = 0; y <= 500; y = y + 25) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#0a0a0a";
        ctx.moveTo(0, y);
        ctx.lineTo(500, y);
        ctx.stroke();
        ctx.closePath();
    }
}

function oneSnake(x, y) {
    if (x == 0 && y == 0) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "#0000a0";
        ctx.lineWidth = bsize;
        ctx.fillRect(posX[x], posY[y], tsize, tsize);
        ctx.rect(posX[x], posY[y], tsize, tsize);
        ctx.stroke();
        ctx.closePath();
    } else if (x % 2 == 1 && x % 2 == 1) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.strokeStyle = "#a00000";
        ctx.lineWidth = bsize;
        ctx.fillRect(posX[x], posY[y], tsize, tsize);
        ctx.rect(posX[x], posY[y], tsize, tsize);
        ctx.stroke();
        ctx.closePath();
    } else if (x % 2 == 0 && x % 2 == 0) {
        ctx.beginPath();
        ctx.fillStyle = "#ff1b1b";
        ctx.strokeStyle = "#9f1010";
        ctx.lineWidth = bsize;
        ctx.fillRect(posX[x], posY[y], tsize, tsize);
        ctx.rect(posX[x], posY[y], tsize, tsize);
        ctx.stroke();
        ctx.closePath();
    }
}

function snakeMove() {
    switch (keyCode) {
        case 119:
            posY[0] = posY[0] - 25;
            lastKey = 119;
            if (posY[0] <= 0) {
                posY[0] = posY[0] + 500;
            }
            break;
        case 115:
            posY[0] = posY[0] + 25;
            lastKey = 115;
            if (posY[0] > 500) {
                posY[0] = posY[0] - 500;
            }
            break;
        case 100:
            posX[0] = posX[0] + 25;
            lastKey = 100;
            if (posX[0] > 500) {
                posX[0] = posX[0] - 500;
            }
            break;
        case 97:
            posX[0] = posX[0] - 25;
            lastKey = 97;
            if (posX[0] < 0) {
                posX[0] = posX[0] + 500;
            }
            break;
    }
    for (let c = points; c > 0; c--) {
        if (posX[0] == posX[c] && posY[0] == posY[c]) {
            points = 1;
            posX.splice(1, posX.length - 1);
            posY.splice(1, posY.length - 1);
        }
    }
}

function snake() {
    for (let i = points; i > 0; i--) {
        oneSnake(i - 1, i - 1);
        if (points > 1) {
            posX[i] = posX[i - 1];
            posY[i] = posY[i - 1];
        }
    }
}

function mealSpawn() {
    if (isPoint == false) {
        posSpawnX = Math.floor(Math.random() * 20);
        posSpawnY = Math.floor(Math.random() * 20);
        posSpawnX = posSpawnX * 25 + 4;
        posSpawnY = posSpawnY * 25 + 4;
    }

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(posSpawnX, posSpawnY, tsize, tsize);
    ctx.strokeStyle = "darkgreen";
    ctx.lineWidth = bsize;
    ctx.rect(posSpawnX, posSpawnY, tsize, tsize);
    ctx.stroke();
    ctx.closePath();
    isPoint = true;
}

function checkPoints() {
    if (posSpawnX == posX[0] && posSpawnY == posY[0]) {
        isPoint = false;
        points++;
    }
}

function writePoints() {
    if (bestPoints < points) {
        bestPoints = points;
    }
    ctx.beginPath();
    ctx.font = "15pt Lato";
    ctx.fillStyle = "white";
    ctx.fillText("Points: " + points, 5, 20);
    ctx.font = "13pt Lato";
    ctx.fillText("High score: " + bestPoints, 376, 20);
    ctx.closePath();
}



function main() {
    map();
    writePoints();
    mealSpawn();
    snake();
    checkPoints();
    snakeMove();
}





document.addEventListener("keypress", onKeyPress);

setInterval(main, 150);
