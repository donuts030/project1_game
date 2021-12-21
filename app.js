const canvas=document.getElementById("playScreen");
const ctx=canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
const xSpeed = 2;
const ySpeed = 1;
const baseVar ={
    x: 1,
    y: 1,

    dy: ySpeed,
    
    sink: true,

    //number of cells in a row and in a column: can change to 2 diff values later
    cellNum: 10,

    grid: [ [2, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
            [1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 1, 0, 3],
            [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],]
}

const cellLength = canvas.width / baseVar.cellNum;
const playerSize = canvas.width / baseVar.cellNum - 1;

start();
// this function would only be called once at the start
function start(){
    document.addEventListener("keydown", playerCtrlPressed);
    document.addEventListener("keyup", playerCtrlReleased);
    setInterval(() => {draw()}, 10);
}

// this function runs once each time frame is refeshed
function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createMaze(baseVar.grid);
    player();
}

function playerCtrlPressed(e){
    if(e.keyCode === 39) { // right
        rightPressed = true;
    }
    else if(e.keyCode === 37) { //left
        leftPressed = true;
    }
    else if(e.keyCode === 32) { //left
        console.log("pressed space");
        spacePressed = true;
    }
}

function playerCtrlReleased(e){
    console.log(e);
    // if(e.keyCode === 39) {
    //     rightPressed = false;
    // }
    // else if(e.keyCode === 37) {
    //     leftPressed = false;
    // }
/*     else if(e.keyCode === 32) { //left
        spacePressed = false;
    } */
}


function createMaze(grid){
    ctx.beginPath();
    //number of cells in a row and in a column: can change to 2 diff values later
    //const cellNum = 10 
    for(let x = 0; x < baseVar.cellNum; x++){
        for(let y = 0; y < baseVar.cellNum; y++){
            let cellType = grid[y][x];
            createBlock(x, y, cellType);
        }
    }
    
    ctx.closePath();
    
}

function createBlock(x, y, cellType){

    //must set colour before drawing cell
    if (cellType === 0){
        ctx.fillStyle = 'rgb(255, 255, 255)';
    }
    else if (cellType === 2){
        ctx.fillStyle = 'rgb(0, 0, 255)';
    }
    else if (cellType === 3){
        ctx.fillStyle = 'rgb(255, 0, 0)';
    }
    else{
        ctx.fillStyle = 'rgb(0, 0, 0)';
    }
    ctx.fillRect(x*cellLength, y*cellLength, cellLength, cellLength);

    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
}



function player(){
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 255, 0)'
    ctx.fillRect(baseVar.x, baseVar.y, playerSize, playerSize);
    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
    ctx.closePath();
    //player movement 
    playerMovement();
}

function collisionDetection(tempPlayerX, tempPlayerY){
    const playerWidth = playerSize;
    const playerHeight = playerWidth;
    let collided = false
    for(let col = 0; col < baseVar.cellNum; col++){
        for(let row = 0; row < baseVar.cellNum; row++){
            if (baseVar.grid[row][col] === 0) {
                //check if collided with player
                let gridX = col * cellLength;
                let gridY = row * cellLength;
                // if (row == 9)
                //     console.log ("gridX:" + gridX + " playX:" + baseVar.x);
                if ((Math.abs(gridX - tempPlayerX) < playerWidth) 
                    && (Math.abs(gridY - tempPlayerY) < playerHeight )){
                
                    console.log("collided at :" + row + ", "+ col);

                    collided = true;

                }

            }
        }
    }
    return collided;
}


function playerMovement(){

    let dx = xSpeed;
    let dy = baseVar.dy;
    let tempPlayerX = baseVar.x;
    let tempPlayerY = baseVar.y;

    let col = Math.floor(baseVar.x/ cellLength);
    let row = Math.floor(baseVar.y / cellLength);


    if (rightPressed) {
        if((baseVar.x + dx + playerSize) > canvas.width){
            dx = 0;
        }
        if(col >= (baseVar.cellNum - 1)){
            dx = 0
        }

        tempPlayerX += dx;
        if (collisionDetection(tempPlayerX, tempPlayerY) === false) {
            baseVar.x = tempPlayerX;
        }
        //baseVar.x += dx; 
        rightPressed = false;
    }
    else if(leftPressed){
        if(baseVar.x <= 0){
            dx = 0;
        }
        if(col < 0 ){
            dx = 0
        }
        // if (baseVar.grid[row][col])

        tempPlayerX -= dx;
        if (collisionDetection(tempPlayerX, tempPlayerY) === false) {
            baseVar.x = tempPlayerX;
        }
        //baseVar.x -= dx;
        leftPressed= false;
    }

    else if (spacePressed){

        baseVar.dy = -baseVar.dy;
        spacePressed = false;

    }    

    if(baseVar.dy > 0){
        if(row >= (baseVar.cellNum - 1)){
            dy = 0;
        }
    }
    else{
        if(baseVar.y <= 0){
            dy = 0;
        }
    }
    tempPlayerY += dy;
    if (collisionDetection(tempPlayerX, tempPlayerY) === false) {
        baseVar.y = tempPlayerY;
    }
    

}
