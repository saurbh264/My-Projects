var passwordLength= document.querySelector(".password-length");
var slider=document.querySelector(".slider");
const uppercase=document.querySelector("#uppercase")
const lowercase=document.querySelector("#lowercase")
const numbers=document.querySelector("#numbers")
const symbols=document.querySelector("#symbols")
const generatebtn= document.querySelector(".generate-btn")
const allbuttons=document.querySelectorAll("input[type='checkbox']")
const passwordText=document.querySelector(".password-text")
const strengthCircle=document.querySelector(".strength-circle")
const copy=document.querySelector(".copy-icon")
const copy_text=document.querySelector(".copied")



slider.addEventListener("input",function(){
    passwordLength.textContent=slider.value;
    currentLength=slider.value;
})

function getRndInt(min,max){
    return Math.random()*(max-min)+min
}
function getRndNumber(){
    return Math.floor(getRndInt(0,9));
}
function getUpperCase(){
    return String.fromCharCode(getRndInt(65,90));
}
function getLowerCase(){
    return String.fromCharCode(getRndInt(97,122));
}
function getSymbol(){
    return String.fromCharCode(getRndInt(33,47));
}

function strength(){
    if ((uppercase.checked)  && (lowercase.checked) && (numbers.checked) && (symbols.checked) && (slider.value>8)){
        strengthCircle.style.cssText="background:green; box-shadow: 0px 0px 8px green;"
    }
    else if(
        (uppercase.checked)  && (lowercase.checked) && ((numbers.checked) || (symbols.checked)) && (slider.value>10)){
            strengthCircle.style.cssText="background:green; box-shadow: 0px 0px 8px green;"
        }
    else if(
            ((uppercase.checked)  || (lowercase.checked)) && ((numbers.checked) || (symbols.checked)) && (slider.value>12)){
                strengthCircle.style.cssText="background:green; box-shadow: 0px 0px 8px green;"
            }
    else if(
            ((uppercase.checked)  || (lowercase.checked)) && (numbers.checked) && (symbols.checked) && (slider.value>8)){
                    strengthCircle.style.cssText="background:green; box-shadow: 0px 0px 8px green;"
            }
    else if(slider.value >10){
        strengthCircle.style.cssText="background:green; box-shadow: 0px 0px 8px green;"
    }
    else{
        strengthCircle.style.cssText="background:red; box-shadow: 0px 0px 8px red;"
    }
}
function shufflepassword(array){
    // Fisher Yates Method
    arr=array.split("")
 
    for(let i=arr.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }    
    return arr.join("");
}

generatebtn.addEventListener("click",function(){
    funcArray=[];
    if (uppercase.checked) funcArray.push(getUpperCase)
    if (lowercase.checked) funcArray.push(getLowerCase)
    if (numbers.checked) funcArray.push(getRndNumber)
    if (symbols.checked) funcArray.push(getSymbol)

    password="";
    for(let i=0;i<funcArray.length;i++){
        password+=funcArray[i]();
    }
    for(let i=0;i<slider.value-funcArray.length;i++){
        let j =Math.floor(getRndInt(0,funcArray.length));
        password+=funcArray[j]();
    }
    password=shufflepassword(password);
    passwordText.textContent=password;
    strength();

})

copy.addEventListener("click",function(){
    navigator.clipboard.writeText(passwordText.textContent);
    copy_text.style.visibility='visible';
    setTimeout(()=>{
        copy_text.style.visibility='hidden';
    },800);
    // It is the code for copying to clipboard.
})

