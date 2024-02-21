const rock=document.querySelector(".option1");
const paper=document.querySelector(".option2");
const scissors=document.querySelector(".option3");
const resulttext=document.querySelector(".result-text");
var computer=document.querySelector(".comp-img");
var user=document.querySelector(".user-img");
const defaulttext='Lets Play !!';

function shakeHand(){
        computer.classList.add("animate-comp")
        user.classList.add("animate-user")
        setTimeout(()=>{
            computer.classList.remove("animate-comp")
            user.classList.remove("animate-user")
        },3000);
        return;
}
const img1='images/rock.png'
const img2='images/paper.png'
const img3='images/scissors.png'
const imgList=[img1,img2,img3];

function randomNum(){
    return Math.floor(Math.random()*3);
};

function showResult(user,computer){
    if((computer == `http://localhost:5173/${img1}`) && (user == `http://localhost:5173/${img2}`)){
        resulttext.textContent='You Won !! Congrats!'
    }
    else if((computer == `http://localhost:5173/${img2}`) && (user == `http://localhost:5173/${img3}`)){
        resulttext.textContent='You Won !! Congrats!'
    }
    else if((computer == `http://localhost:5173/${img3}`) && (user == `http://localhost:5173/${img1}`)){
        resulttext.textContent='You Won !! Congrats!'
    }
    else if(computer == user) {
        resulttext.textContent='It\'s a Draw.';
    }
    else{
        resulttext.textContent='Computer Won! Hard Luck!';
    }
}

rock.addEventListener("click",()=>{
    if(computer.src != img1 && user.src != img1 && resulttext.textContent!='Lets Play !!'){
        computer.src=img1;
        user.src=img1;
        resulttext.textContent='Lets Play Again !';
    }
    shakeHand();
    setTimeout(()=>{
        let rnd=randomNum()
        user.src='images/rock.png';
        computer.src=imgList[rnd];
        showResult(user.src,computer.src);
    },3000);
    
});
scissors.addEventListener("click",()=>{
    if(computer.src != img1 && user.src != img1 && resulttext.textContent!='Lets Play !!'){
        computer.src=img1;
        user.src=img1;
        resulttext.textContent='Lets Play Again !';
    }
    shakeHand();
    setTimeout(()=>{
        user.src='images/scissors.png';
        let rnd=randomNum()
        computer.src=imgList[rnd];
        showResult(user.src,computer.src);
    },3000);
    
});
paper.addEventListener("click",()=>{
    if(computer.src != img1 && user.src != img1 && resulttext.textContent!='Lets Play !!'){
        computer.src=img1;
        user.src=img1;
        resulttext.textContent='Lets Play Again !';
    }
    shakeHand();
    setTimeout(()=>{
        user.src='images/paper.png';
        let rnd=randomNum()
        computer.src=imgList[rnd];
        showResult(user.src,computer.src);
    },3000);
    
});
