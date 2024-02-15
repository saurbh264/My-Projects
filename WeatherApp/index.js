const yourweather = document.querySelector("#yourweather")
const changeweather = document.querySelector("#searchweather")
const form = document.querySelector(".form")
const variableData = document.querySelectorAll(".variable")


changeweather.addEventListener("click",()=>{
        form.classList.remove("notactive");
        variableData.forEach((element)=> {element.classList.add("notactive")});
        yourweather.classList.remove("selected");
        changeweather.classList.add("selected");
})

yourweather.addEventListener("click",()=>{
    variableData.forEach((element)=> element.classList.remove("notactive"));
    form.classList.add("notactive");
    yourweather.classList.add("selected");
    changeweather.classList.remove("selected");
})