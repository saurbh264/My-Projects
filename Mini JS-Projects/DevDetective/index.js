const mode = document.querySelector(".mode");
const modeicon = document.querySelector(".mode-icon");
const container = document.querySelector(".container");
const maincont = document.querySelector(".main-content");
const secondr = document.querySelector(".right-second");
const form = document.querySelector(".form");
const search = document.querySelector("#default-search");
const options = { year: "numeric", month: "short", day: "2-digit" };
fetchGithubUser("saurbh264")

function changecolors() {
  if (container.classList.contains("light")) {
    container.classList.remove("light");
    container.classList.add("dark");
    maincont.classList.add("dark-color");
    secondr.classList.add("dark");
  } else {
    container.classList.remove("dark");
    container.classList.add("light");
    maincont.classList.remove("dark-color");
    secondr.classList.remove("dark");
  }
}

mode.addEventListener("click", () => {
  if (mode.innerText == "Dark") {
    mode.innerText = "Light";
    modeicon.innerHTML = `<i class="ri-sun-fill"></i>`;
  } else {
    mode.innerText = "Dark";
    modeicon.innerHTML = `<i class="ri-moon-fill"></i>`;
  }
  changecolors();
});
modeicon.addEventListener("click", () => {
  if (mode.innerText == "Dark") {
    mode.innerText = "Light";
    modeicon.innerHTML = `<i class="ri-sun-fill"></i>`;
  } else {
    mode.innerText = "Dark";
    modeicon.innerHTML = `<i class="ri-moon-fill"></i>`;
  }
  changecolors();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchvalue = search.value;
  if (searchvalue == "") {
    return;
  } 
  else {
    fetchGithubUser(searchvalue);
  }
});

async function fetchGithubUser(searchvalue) {
  try{
    let response = await fetch(`https://api.github.com/users/${searchvalue}`);
    let data = await response.json();
    if(data.message === "Not Found"){
        alert("No Such User Exists.")
    }
    else{
    updateData(data);
    }
}
    catch(e){
        console.log("You've encounter an error"+e);
    }
}


function updateData(data) {
  const name = document.querySelector(".name");
  const joined = document.querySelector(".joined");
  const description = document.querySelector(".description");
  const repos = document.querySelector(".repo-number");
  const followers = document.querySelector(".followers-number");
  const following = document.querySelector(".following-number");
  const company = document.querySelector(".company");
  const website = document.querySelector(".website");
  const location = document.querySelector(".location");
  const twitter = document.querySelector(".twitter");
  const avatar = document.querySelector(".avatar");
  const repoid = document.querySelector(".repoid");
  name.innerText = data?.name;
  joined.innerText = `Joined ${finddate(data)}`;
  description.innerText = data?.bio;
  repos.innerText = data?.public_repos;
  followers.innerText = data?.followers;
  following.innerText = data?.following;
  if (data?.company == null) {
    company.innerHTML =`<i class="ri-building-line"></i> Not Available`;
  } else {
    company.innerHTML =`<i class="ri-building-line"></i> ${data?.company}`;
  }
  if (data?.twitter_username == null) {
    twitter.innerHTML =`<i class="ri-twitter-line"></i><a href="">Not Available</a>`;
  } else {
    twitter.innerHTML =`<i class="ri-twitter-line"></i><a href="${data?.twitter_username}">${data?.twitter_username}</a> `;
  }
  if (data?.location == null) {
    location.innerHTML =`<i class="ri-map-pin-line"></i> Not Available`;
  } else {
    location.innerHTML =`<i class="ri-map-pin-line"></i> ${data?.location}`;
  }
  if (data?.blog == "") {
    website.innerHTML =`<i class="ri-links-line"></i><a href="">Not Available</a>`;
  } else {
    website.innerHTML =`<i class="ri-links-line"></i><a href="${data?.blog}">Click Here</a> `;
  }
  avatar.src = data?.avatar_url;
  repoid.href= data?.html_url;
  repoid.innerText= `@${data?.login}`;
}

function finddate(data) {
  const dateString = data?.created_at;
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
}
