const currentplayer=document.querySelector(".currentplayer")
const newgame=document.querySelector(".newgame")
const boxes=document.querySelectorAll(".playarea")
let currentPlayer;
let gameGrid=[];
let winner="";
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initGame(){
    boxes.forEach(box=>{
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList.remove("win");
    })
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newgame.classList.remove("active")
    currentplayer.innerText=`Current-Player-${currentPlayer}`
}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        gameGrid[index]=currentPlayer;
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkforWinner();
    }
}

function swapTurn(){
    if (currentPlayer === "X"){
        currentPlayer="O"
        currentplayer.innerText=`Current-Player-${currentPlayer}`
    }
    else{
        currentPlayer="X"
        currentplayer.innerText=`Current-Player-${currentPlayer}`
    }
}
function checkforWinner(){
    let count=0;
    winningPositions.forEach((position)=>{
        if(gameGrid[position[0]] !="" && gameGrid[position[1]] !="" && gameGrid[position[2]] !="" && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] ){
            winner=gameGrid[position[0]]
            position.forEach((posi)=>{
                boxes[posi].classList.add("win");
            })
            endGame();
        }
    })
    gameGrid.forEach(value=>{
        if(value != ""){
            count++;
        }
    })
    if(count==9 && winner==""){
        currentplayer.innerText=`GG Guys!! Its a Draw`
        newgame.classList.add("active")
    }
}

function endGame(){
    boxes.forEach(box=>{
        box.style.pointerEvents="none";
    })
    currentplayer.innerText=`Wooh!! Player-${winner} Won!`
    newgame.classList.add("active")
}
newgame.addEventListener("click", initGame);