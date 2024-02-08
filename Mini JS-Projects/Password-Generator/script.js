var passwordLength= document.querySelector(".password-length");
var slider=document.querySelector(".slider");

slider.addEventListener("click",function(){
    passwordLength.textContent=slider.value;
})