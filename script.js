function updateTime() {
  document.querySelector("#timeElement").innerHTML =
    new Date().toLocaleString();
}
setInterval(updateTime, 1000);


const windowScreen = document.querySelector("#window");
const windowScreenClose = document.querySelector("#windowclose");
const windowScreenOpen = document.querySelector("#windowopen");

const notesWindow = document.querySelector("#notes");
const notesClose = document.querySelector("#notesclose");

const aboutWindow = document.querySelector("#about");
const aboutClose = document.querySelector("#aboutclose");


const weatherWindow = document.querySelector("#weather");
const weatherClose = document.querySelector("#weatherclose");


windowScreenClose.addEventListener("click", () => {
  windowScreen.style.display = "none";
});

windowScreenOpen.addEventListener("click", () => {
  windowScreen.style.display = "block";
  windowScreen.style.left = "50%";
  windowScreen.style.top = "50%";
  windowScreen.style.transform = "translate(-50%, -50%)";
});


notesClose.addEventListener("click", () => {
  notesWindow.style.display = "none";
});


aboutClose.addEventListener("click", () => {
  aboutWindow.style.display = "none";
});


weatherClose.addEventListener("click", () => {
  weatherWindow.style.display = "none";
});


function loadWeather() {
  const lat = 38.4237;
  const lon = 27.1428;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const w = data.current_weather;

      document.querySelector("#temp").textContent = w.temperature;
      document.querySelector("#wind").textContent = w.windspeed;
    });
}

let selectedIcon = null;

function selectIcon(element) {
  element.querySelector(".appIcon").classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  element.querySelector(".appIcon").classList.remove("selected");
  selectedIcon = null;
}

document.querySelectorAll(".desktopApp").forEach(app => {
  app.addEventListener("click", () => {

    if (selectedIcon === app) {

      if (app.id === "notesApp") {
        notesWindow.style.display = "block";
      }

      if (app.id === "aboutApp") {
        aboutWindow.style.display = "block";
      }

      if (app.id === "weatherApp") {
        weatherWindow.style.display = "block";
        loadWeather();
      }

      return;
    }

    if (selectedIcon) {
      deselectIcon(selectedIcon);
    }

    selectIcon(app);
  });
});


document.body.addEventListener("click", (e) => {
  if (!e.target.closest(".desktopApp")) {
    if (selectedIcon) {
      deselectIcon(selectedIcon);
    }
  }
});