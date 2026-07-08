function updateTime() {
  document.querySelector("#timeElement").innerHTML =
    new Date().toLocaleString();
}

setInterval(updateTime, 1000);

let savedWallpaper =
  localStorage.getItem("kosWallpaper");


if (savedWallpaper) {

  document.body.style.backgroundImage =
    "url(" + savedWallpaper + ")";

}

const windowScreen = document.querySelector("#window");
const windowScreenClose = document.querySelector("#windowclose");
const windowScreenOpen = document.querySelector("#windowopen");

const notesWindow = document.querySelector("#notes");
const notesClose = document.querySelector("#notesclose");

const aboutWindow = document.querySelector("#about");
const aboutClose = document.querySelector("#aboutclose");

const weatherWindow = document.querySelector("#weather");
const weatherClose = document.querySelector("#weatherclose");

const calcDisplay = document.querySelector("#calculator");
const calcclose = document.querySelector("#calcclose");

const terminalWindow = document.querySelector("#terminal");
const terminalClose = document.querySelector("#terminalclose");

const settingsWindow = document.querySelector("#settings");

const settingsClose = document.querySelector("#settingsclose");

// Terminal Close
if (terminalClose) {
  terminalClose.addEventListener("click", () => {
    terminalWindow.style.display = "none";
  });
}
settingsClose.addEventListener("click", () => {

  settingsWindow.style.display = "none";

});

// Main Window
windowScreenClose.addEventListener("click", () => {
  windowScreen.style.display = "none";
});


windowScreenOpen.addEventListener("click", () => {
  windowScreen.style.display = "block";
  windowScreen.style.left = "50%";
  windowScreen.style.top = "50%";
  windowScreen.style.transform = "translate(-50%, -50%)";
});


// Notes
notesClose.addEventListener("click", () => {
  notesWindow.style.display = "none";
});


// About
aboutClose.addEventListener("click", () => {
  aboutWindow.style.display = "none";
});


// Weather
weatherClose.addEventListener("click", () => {
  weatherWindow.style.display = "none";
});


// Calculator
calcclose.addEventListener("click", () => {
  calcDisplay.style.display = "none";
});




// WEATHER API

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


      if (app.id === "terminalApp") {
        terminalWindow.style.display = "block";
      }
      if (app.id === "settingsApp") {

        settingsWindow.style.display = "block";

        loadSettings();

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





// CALCULATOR

function openCalculator() {
  document.getElementById("calculator").style.display = "block";
}


function closeCalculator() {
  document.getElementById("calculator").style.display = "none";
}


function addCalc(value) {
  document.getElementById("calcDisplay").value += value;
}


function clearCalc() {
  document.getElementById("calcDisplay").value = "";
}


function calculate() {

  try {

    document.getElementById("calcDisplay").value =
      eval(document.getElementById("calcDisplay").value);

  }

  catch {

    document.getElementById("calcDisplay").value = "Error";

  }

}


const terminalInput = document.querySelector("#terminalInput");
const terminalOutput = document.querySelector("#terminalOutput");


let currentPath = "~";

const fileSystem = {
  "~": [
    "Documents",
    "Pictures",
    "Apps",
    "System"
  ],

  "~/Documents": [
    "notes.txt",
    "project.txt"
  ],

  "~/Pictures": [
    "wallpaper.png",
    "logo.png"
  ],

  "~/Apps": [
    "Terminal",
    "Calculator",
    "Weather",
    "Notes"
  ],

  "~/System": [
    "kKernel",
    "system.config"
  ]
};



function terminalCommand(command) {


  let args = command.trim().split(" ");
  let cmd = args[0];



  switch (cmd) {


    case "help":

      return `
Available Commands:

help
about
neofetch
apps
clear
echo
date
version
open <app>
pwd
ls
cd <folder>
`;
    case "about":
      return "kOS - Web Based Operating System";
    case "version":
      return "kOS Version 1.0";
    case "apps":

      return `
Installed Applications:

[✓] Notes
[✓] Weather
[✓] Calculator
[✓] Terminal
`;

    case "date":

      return new Date().toString();



    case "echo":

      return args.slice(1).join(" ");



    case "pwd":

      return currentPath;



    case "ls":

      if (fileSystem[currentPath]) {

        return fileSystem[currentPath].join("\n");

      }

      return "Directory empty";




    case "cd":

      let folder = args[1];


      if (!folder) {
        return "Usage: cd <folder>";
      }


      if (folder === "..") {

        currentPath = "~";
        return currentPath;

      }


      let newPath;


      if (currentPath === "~") {

        newPath = "~/" + folder;

      }
      else {

        newPath = currentPath + "/" + folder;

      }



      if (fileSystem[newPath]) {

        currentPath = newPath;
        return "Changed directory to " + currentPath;

      }


      return "Directory not found: " + folder;





    case "neofetch":

      return `
      _  __ ___  ___
     | |/ / _ \\/ __|
     | ' < (_) \\__ \\
     |_|\\_\\___/|___/

OS: kOS
Version: 1.0
Kernel: kKernel
Platform: Web
Shell: kShell
Apps: 5
Status: Running
`;





    case "clear":

      terminalOutput.innerHTML = "";
      return null;





    case "open":
      let app = args[1];
      if (!app) {
        return "Usage: open <app>";
      }
      if (app === "calculator") {

        calcDisplay.style.display = "block";
        return "Opening Calculator...";

      }
      if (app === "notes") {

        notesWindow.style.display = "block";
        return "Opening Notes...";

      }
      if (app === "weather") {

        weatherWindow.style.display = "block";
        loadWeather();

        return "Opening Weather...";

      }
      if (app === "about") {

        aboutWindow.style.display = "block";
        return "Opening About...";

      }
      if (app === "terminal") {

        terminalWindow.style.display = "block";
        return "Terminal already running.";

      }
      return "App not found: " + app;
    default:

      return "Command not found: " + cmd;
  }
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let command = terminalInput.value;
      let result = terminalCommand(command);
      terminalOutput.innerHTML += `
    <div>> ${command}</div>
    `;
      if (result) {
        terminalOutput.innerHTML += `
      <div>${result}</div>
      `;
      }
      terminalInput.value = "";
      terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
    }
  });
}
const bootScreen = document.getElementById("bootScreen");
const bootText = document.getElementById("bootText");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const bootLines = [

  "[ OK ] BIOS check completed",

  "[ OK ] Loading kKernel",

  "[ OK ] Initializing memory",

  "[ OK ] Loading system drivers",

  "[ OK ] Starting kShell",

  "[ OK ] Terminal.exe loaded",

  "[ OK ] Calculator.exe loaded",

  "[ OK ] Weather service initialized",

  "[ OK ] Desktop environment started",

  "",

  "kOS is starting..."

];

let bootIndex = 0;

function bootAnimation() {

  if (bootIndex < bootLines.length) {

    bootText.innerHTML +=
      bootLines[bootIndex] + "<br>";

    let progress =
      Math.round(
        ((bootIndex + 1) / bootLines.length) * 100
      );

    progressBar.style.width =
      progress + "%";

    progressText.innerHTML =
      progress + "%";

    bootIndex++;

    setTimeout(
      bootAnimation,
      350
    );

  }

  else {

    progressBar.style.width = "100%";
    progressText.innerHTML = "100%";

    setTimeout(() => {

      bootScreen.style.opacity = "0";
      bootScreen.style.transition = "0.5s";

      setTimeout(() => {
        bootScreen.style.display = "none";
        showLogin();
      }, 500);


    }, 1000);


  }


}



window.addEventListener(
  "load",
  bootAnimation
);


const loginScreen =
  document.getElementById("loginScreen");

const loginButton =
  document.getElementById("loginButton");

const createUserButton =
  document.getElementById("createUserButton");

const loginStatus =
  document.getElementById("loginStatus");

const loginTitle =
  document.getElementById("loginTitle");



function getUser() {

  return JSON.parse(
    localStorage.getItem("kosUser")
  );

}



function showLogin() {

  loginScreen.style.display = "flex";


  let user = getUser();


  if (user) {

    loginTitle.innerHTML =
      "Welcome back, " + user.username;

  }
  else {

    loginTitle.innerHTML =
      "Create your kOS User";

  }

}




// USER CREATE

createUserButton.addEventListener(
  "click",
  () => {


    let username =
      document.getElementById("usernameInput").value;


    let password =
      document.getElementById("passwordInput").value;



    if (!username || !password) {

      loginStatus.style.color = "red";

      loginStatus.innerHTML =
        "Please fill all fields";

      return;

    }



    let user = {

      username: username,
      password: password

    };



    localStorage.setItem(
      "kosUser",
      JSON.stringify(user)
    );



    loginStatus.style.color = "#00ff66";


    loginStatus.innerHTML =
      "User created! You can login now.";



    loginTitle.innerHTML =
      "Login";


  });

loginButton.addEventListener(
  "click",
  () => {


    let username =
      document.getElementById("usernameInput").value;


    let password =
      document.getElementById("passwordInput").value;



    let user = getUser();



    if (!user) {

      loginStatus.style.color = "red";

      loginStatus.innerHTML =
        "No user found. Create one.";

      return;

    }




    if (
      username === user.username &&
      password === user.password
    ) {


      loginStatus.style.color = "#00ff66";


      loginStatus.innerHTML =
        "Starting desktop...";



      setTimeout(() => {


        loginScreen.style.opacity = "0";
        loginScreen.style.transition = "0.5s";



        setTimeout(() => {

          loginScreen.style.display = "none";

        }, 500);



      }, 1000);



    }

    else {


      loginStatus.style.color = "red";

      loginStatus.innerHTML =
        "Wrong username or password";


    }



  });
function updateTerminalUser() {

  const user = JSON.parse(
    localStorage.getItem("kosUser")
  );


  if (user) {

    document.getElementById("terminalPrompt")
      .innerHTML =
      user.username + "@root >";

  }

}


updateTerminalUser();
function loadSettings() {

  let user =
    JSON.parse(
      localStorage.getItem("kosUser")
    );


  if (user) {

    document.getElementById("settingsUser")
      .innerHTML = user.username;

  }

}



function changeWallpaper(file) {

  document.body.style.backgroundImage =
    "url(" + file + ")";


  localStorage.setItem(
    "kosWallpaper",
    file
  );

}
