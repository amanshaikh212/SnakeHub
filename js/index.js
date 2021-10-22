let inputDir = {x:0,y:0};

const foodSound = new Audio('./music/food.mp3');

const gameOverSound = new Audio('./music/gameover.mp3');

const moveSound = new Audio('./music/move.mp3');

const musicSound = new Audio('./music/music.mp3');

const easyBtn = document.getElementById("easyButton")
const medBtn =  document.getElementById("mediumButton")
const hardBtn = document.getElementById("hardButton")
const redBtn = document.getElementById("redButton")
const pinkBtn = document.getElementById("pinkButton")
const blueBtn = document.getElementById("blueButton")

let board = document.getElementById("board")
var mode = "easy";
let score= 0;
let speed=5;

// let headSnake = document.getElementsByClassName("head")




let lastPaintTime = 0;
let snakeArr = [
    {
        x:13,
        y:15
    }
];

food = {x:6,y:7};
// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    easyBtn.addEventListener('click',function(){
        mode="easy";
        easyBtn.style.backgroundColor="blue";
        medBtn.style.backgroundColor="#75F336";
        hardBtn.style.backgroundColor="#75F336";
        
        })
    
    medBtn.addEventListener('click',function(){
        mode="medium";
        easyBtn.style.backgroundColor="#75F336";
        medBtn.style.backgroundColor="blue";
        hardBtn.style.backgroundColor="#75F336";
        
        })
    
    hardBtn.addEventListener('click',function(){
        mode="hard";
        easyBtn.style.backgroundColor="#75F336";
        medBtn.style.backgroundColor="#75F336";
        hardBtn.style.backgroundColor="blue";
        
        })
    if(mode=="easy"){
        speed=5;
    }
    else if(mode=="medium"){
        speed=10;
    }
    else if(mode=="hard"){
        speed=15;
    }
    redBtn.addEventListener('click',function(){
        board.style.backgroundColor="#EE4B2B";
    })
    pinkBtn.addEventListener('click',function(){
        board.style.backgroundColor="pink";
        
    })
    blueBtn.addEventListener('click',function(){
        board.style.backgroundColor="blue";

    })
    gameEngine();
}
function isCollide(snake){
    // If you hit yourself

    for(let i = 1;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;

        }
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
}
function gameEngine(){
    //Part 1: Updating Snake Array and Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game over,press any key to play again!");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
        
    }
    // If you have eaten the food , increment score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score: "+hiscorecval;
        }
        scoreBox.innerHTML = "Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+ (b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}

    }
    // Moving snake
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Render snake and food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

        // window.addEventListener('keydown',e=>{
        //     switch (e.key) {
        //         case "ArrowUp":
        //             console.log("arrow up aman");
        //             snakeElement.style.backgroundImage = url("../img/headup.png")
        //             break;
        //         case "ArrowDown":
        //             snakeElement.style.backgroundImage = url("../img/headdown.png")
        //             break;
        //         case "ArrowLeft":
        //             snakeElement.style.backgroundImage = url("../img/headleft.png")
        //             break;
        //         case "ArrowRight":
        //             snakeElement.style.backgroundImage = url("../img/headright.png")
        //             break;
            
        //         default:
        //             break;
        //     }
        // })
    })

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    

}











// Main Logic Starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore")
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: "+hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            // $(".headSnake").css("background-image","url(../img/headup.png)");
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            // $(".headSnake").css("background-image","url(../img/headdown.png)");
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            // $(".headSnake").css("background-image","url(../img/headleft.png)");
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            // $(".headSnake").css("background-image","url(../img/headright.png)");
            break;
    
        default:
            break;
    }


});

