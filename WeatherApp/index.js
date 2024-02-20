const yourweather = document.querySelector("#yourweather")
const changeweather = document.querySelector("#searchweather")
const form = document.querySelector(".form")
const variableData = document.querySelectorAll(".variable")
const allowbutton=document.querySelector(".clicktoallow")
const firstdiv=document.querySelector(".firstdiv")
const API_key='29f6f9ba9d9e03734f358890c2492b73';
const loadingdiv=document.querySelector(".loadingdiv")
const searchform=document.querySelector(".searchform")
const error=document.querySelector(".error");
const variable2 = document.querySelector(".variablenew")

getfromSessionStorage();
function getfromSessionStorage(){
    const localCoordinate= sessionStorage.getItem("userCoordinates");
    if(!localCoordinate){
        firstdiv.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinate);
        variableData.forEach((element)=> element.classList.add("active"));
        fetchUserWeatherInfo(coordinates);
    }
}

changeweather.addEventListener("click",()=>{
    changeweather.classList.add("selected");
    yourweather.classList.remove("selected");
    variableData.forEach((element)=> element.classList.remove("active"));
    form.classList.add("active");
})

yourweather.addEventListener("click",()=>{
    if(variableData[0].classList.contains("margins")){
        variableData.forEach((element)=> element.classList.remove("margins"));
    }
    if(error.classList.contains("active")){
        error.classList.remove("active");
    }
    yourweather.classList.add("selected");
    changeweather.classList.remove("selected");
    variableData.forEach((element)=> element.classList.add("active"));
    form.classList.remove("active");
})

allowbutton.addEventListener("click",getLocation)

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("NO GeoLocation Support.")
    }
}

function showPosition(position){

    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    firstdiv.classList.remove("active"); 
    loadingdiv.classList.add("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data = await response.json()
        loadingdiv.classList.remove("active");
        variableData.forEach((element)=> element.classList.add("active"));
        renderWeatherInfo(data);
    }
    catch(err){
        loadingdiv.classList.remove("active");
        alert("You've encountered an error.")
        console.error('Error fetching weather data:', err);
    }

}

function renderWeatherInfo(data){
    const cityName=document.querySelector(".city-name")
    const countryicon=document.querySelector(".country-icon")
    const weather=document.querySelector(".weather")
    const temperature=document.querySelector(".temperature")
    const wind=document.querySelector(".wind")
    const clouds=document.querySelector(".clouds")
    const humidity=document.querySelector(".humidity")
    const weatherimage=document.querySelector(".image-icon");

    cityName.textContent=data?.name;
    countryicon.src=`https://flagcdn.com/32x24/${(data?.sys?.country).toLowerCase()}.png`;
    weather.textContent=data?.weather?.[0]?.main;
    temperature.textContent=`${(data?.main?.temp-273).toFixed(2)} °C`;
    wind.textContent=`${data?.wind?.speed} m/s`;
    clouds.textContent=`${data?.clouds?.all} %`;
    humidity.textContent=`${data?.main?.humidity} %`;
    weatherimage.src=`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`;

}
form.addEventListener("submit", (e)=>{
    console.log("Yaha Pahunch Raha mai.")
    e.preventDefault();
    let cityname=searchform.value;
    if(cityname==""){
        return
    }
    if(error.classList.contains("active")){
        error.classList.remove("active");
    }
    else{
        fetchSearchWeatherInfo(cityname);
    }
})

async function fetchSearchWeatherInfo(city){
    try{
        loadingdiv.classList.add("active");
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
        let data= await response.json();
        loadingdiv.classList.remove("active");
        if(data?.cod !="404"){
            variableData.forEach((element)=> element.classList.add("active"));
            variableData.forEach((element)=> element.classList.add("margins"));
            variable2.classList.add("setmargin");
            renderWeatherInfo(data);
        }
        else{  
            error.classList.add("active");
            variableData.forEach((element)=> element.classList.remove("active"));
        }
    }
    catch(e){
        console.log("We've encountered an error ",e);
    }
}










































