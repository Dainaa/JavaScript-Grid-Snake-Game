//Variables
//getting variables from the HTML
const grid = document.querySelector('.game-grid') //grid 
const displayScore = document.querySelector("#score") //score var
const homeScreen = document.getElementById("home-screen")
const gameScreen = document.getElementById("game-screen")
const gameTitle = document.querySelector(".game-title")
const levelInfo = document.getElementById("game-information")
const overlay = document.getElementById("overlay")
const themeSelectOverlay = document.getElementById("theme-select-overlay")
const gameOver = document.getElementById("overlay-game-over")
//Buttons
const startBtn = document.getElementById("start") //start new game
const backBtn = document.querySelector("#back") //back to home page
const themeBtn = document.getElementById("themes")
const fruitBtn = document.getElementsByClassName("selectable-image")
const saveScoreBtn = document.getElementById("save-score")
const playAgainBtn = document.getElementById("play-again")
const quitBtn = document.getElementById("quit")

//declare arrays
let squares = []
let currentSnake = [2, 1, 0] //start at random indices for every level <future improvement>

//directions
let direction = 1 //forward or right

//width
const width = 25

//other
let appleIndex = 0
let score = 0
let intervalTime = 1000
let timerId = 0
let fruit = 'apple'


//Functions

//Select Fruit 
function selectFruit(e){
    if(e.target.alt == "Apple"){
        fruit = 'apple'
    }
    if(e.target.alt == "Blueberry"){
        fruit = 'blueberry'
    }
    if(e.target.alt == "Cherry"){
        fruit = 'cherry'
    }
    if(e.target.alt == "Mango"){
        fruit = 'mango'
    }
    if(e.target.alt == "Pear"){
        fruit = 'pear'
    }
    if(e.target.alt == "Orange"){
        fruit = 'orange'
    }
    if(e.target.alt == "Lemon"){
        fruit = 'lemon'
    }
    console.log("chosen fruit:" + fruit)

    //Once a theme has been selected
    //close out of the modal
    themeSelectOverlay.style.display ='none'
    overlay.style.display = 'none'


}
//Choose Theme
function selectTheme(event){
    themeSelectOverlay.style.display='block'
    overlay.style.display='block'
}

function quitGame(){
    //Game Over 
    gameOver.style.display='none'
    overlay.style.display='none'
    goBack();
}
//Start Game

function startGame(){
    gameTitle.style.display='none'
    homeScreen.style.display='none'
    levelInfo.style.display='flex'
    gameScreen.style.display='block'

    //pages loaded successfully
    //delete pre-existing things
    //remove snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    console.log("Snake Removed");
    squares[appleIndex].classList.remove(fruit)

    //reset snake and score]
    clearInterval(timerId)
    currentSnake=[2,1,0]
    score = 0
    direction = 1 //reset direction
    displayScore.textContent = score;
    intervalTime = 1000; //reset interval time
    
    //style snake
    currentSnake.forEach(index => squares[index].classList.add('snake'))

    //start moving
    timerId = setInterval(move, intervalTime)


    //generate fruit
    generateApples()

    //listen for user input on keypresses
    document.addEventListener('keyup', control)
}  

//Back Button

function goBack(){    

    //reset snake, interval time and score and displayScore
    //this will happen in startGame
    
    squares[appleIndex].classList.remove(fruit)
    fruit = 'apple'

    gameTitle.style.display='block'
    homeScreen.style.display='block'
    levelInfo.style.display='none'
    gameScreen.style.display='none'

    //dialog box
    console.log("Have Gone Back")
}

//create grid of divs in game-grid
function createGrid() {

    //create 625 squares
    for (let i = 0; i < 625; i++) {
        const square = document.createElement('div');
        //add styling to these elements
        square.classList.add('squares');

        //create array of squares
        grid.appendChild(square);

        //append each square to array
        squares.push(square);
    }


}

//move snake
function move() {

    //check for collisions


    if ((currentSnake[0] % 25 == 0 && direction == -1) ||
        ((currentSnake[0] - 24) % 25 == 0 && direction == 1) ||
        (currentSnake[0] - 25 < 0 && direction == -width) ||
        (currentSnake[0] + 25 > 625 && direction == +width) ||
        (squares[currentSnake[0] + direction].classList.contains('snake'))) {
        //stop moving
        console.log("Game Over")
        //Game Over 
        gameOver.style.display='flex'
        overlay.style.display='block'


        return clearInterval(timerId);
    }

    //remove square from tail end
    const tail = currentSnake.pop();

    //remove styling
    squares[tail].classList.remove('snake');

    //add square to front end
    currentSnake.unshift(currentSnake[0] + direction);

    //add styling
    squares[currentSnake[0]].classList.add('snake');

    //deal with snake head getting the apples
    if (squares[currentSnake[0]].classList.contains(fruit)) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove(fruit)
        //extend snake body by adding class of snake
        squares[tail].classList.add('snake')
        //extend snake array
        currentSnake.push(tail)
        console.log(currentSnake)
        //generate new apple
        generateApples()
        //increase score
        score++
        displayScore.textContent = displayScore.innerText = score
        //speed up snake
        clearInterval(timerId)
        intervalTime = intervalTime * 0.9
        timerId = setInterval(move, intervalTime)
        console.log(intervalTime)
    }

}

//generate apples
function generateApples() {
    do {
        //generate random numbers 
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) //until you generate one in a square without the snake
    //add styling
    squares[appleIndex].classList.add(fruit)
}

//keycode testing
function control(e) {
    if (e.keyCode == 37) {
        console.log("left arrow")
        direction = -1
    }
    if (e.keyCode == 38) {
        console.log("up arrow")
        direction = -width
    }
    if (e.keyCode == 39) {
        console.log("right arrow")
        direction = 1
    }
    if (e.keyCode == 40) {
        console.log("down arrow")
        direction = +width
    }
}

//play again
function playAgain(){
    console.log("Play Again clicked")
    gameOver.style.display='none'
    overlay.style.display='none'
    squares[appleIndex].classList.remove(fruit)
    fruit = 'apple'
    startGame();
}
//save score
function saveScore(){
    console.log("Save score called")
}
//event listeners
startBtn.addEventListener('click',startGame)
backBtn.addEventListener('click',goBack)
themeBtn.addEventListener('click',selectTheme)
for (const btn of fruitBtn){
    btn.addEventListener('click', selectFruit)
}
saveScoreBtn.addEventListener('click',saveScore)
playAgainBtn.addEventListener('click',playAgain)
quitBtn.addEventListener('click',quitGame)
//runtime code
createGrid();