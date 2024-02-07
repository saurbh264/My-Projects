const btn=document.querySelector(".button1");
const cross=document.querySelector(".cross-area");
const overlay=document.querySelector(".overlay");
const popup=document.querySelector(".popup");

function openModal(){
    popup.style.scale='1';
    overlay.style.visibility='visible';    
};

function closeModal(){
    popup.style.scale='0';
    overlay.style.visibility='hidden';    
}

btn.addEventListener("click",function(){
    openModal();
})

cross.addEventListener("click",function(){
    closeModal();
})

overlay.addEventListener("click",function(){
    closeModal();
})