window.onload = function () {
  // Update the time box in the start bar every 10 seconds
  function updateTime() {
    var today = new Date();
    var hours24 = today.getHours();
    var hours12;
    var minutes = today.getMinutes();
    var suffix = "";

    // define AM/PM
    if (hours24 >= 12) {
      suffix = " PM";
      hours12 = hours24 % 12;
    } else {
      suffix = " AM";
      hours12 = hours24;
    }

    if (minutes % 10 == 0) {
      //minutes = minutes + "0";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var time = hours12 + ":" + minutes + suffix;

    var timeBox = document.querySelector(".start__time-text");

    timeBox.innerHTML = time;
  }

  setInterval(updateTime, 1000);

  // Store the necessary objects
  var startButton = document.querySelector(".start__button");

  var startMenu = document.querySelector(".start__menu-main");

  var body = document.querySelector("body");

  let programsItem = document.querySelector(".programs");

  let programsMenu = document.querySelector(".sub__programs");

  // Start menu appear on click of start button and disappear on click of start button or anything else except the menu

  body.onclick = function (e) {
    for (var i = 0, l = e.target.classList.length; i < l; ++i) {
      if (/start__.*/.test(e.target.classList[i])) {
        break;
      } else {
        startMenu.classList.remove("menu-open");
      }
    }
  };

  // Show/hide menu on click

  function menuDisplay(menu) {
    if (menu.classList.contains("menu-open")) {
      menu.classList.remove("menu-open");
    } else {
      menu.classList.add("menu-open");
    }
  }

  startButton.addEventListener("click", function () {
    menuDisplay(startMenu);
  });

  programsItem.addEventListener("mouseover", function () {
    menuDisplay(programsMenu);
  });

  // Make a click on the tasks open the pages
  let aboutWindow = document.querySelector(".about-window");
  let contactWindow = document.querySelector(".contact-window");
  let clickmeAbout = document.getElementsByClassName("clickme-about");

  let clickmeContact = document.getElementsByClassName("clickme-contact");
  let closeme = document.querySelector(".closeme");
  let contactMaximize = document.querySelector(".contact-maximize");
  let aboutMaximize = document.querySelector(".about-maximize");
  console.log(aboutMaximize);
  console.log(contactMaximize);
  let aboutTextbox = document.querySelector(".textbox-about");
  let contactTextbox = document.querySelector(".textbox-contact");
  // let contactTask = document.querySelector(".contact-task");
  // let aboutTask = document.querySelector(".about-task");

  openAboutWindow = true;
  openContactWindow = true;

  // make sure that all "about" elements opening the window
  // for (let i = 0; i < clickmeAbout.length; i++) {
  console.log(clickmeAbout[0]);
  clickmeAbout[0].onclick = function () {
    console.log("clicked about");
    aboutWindow.hidden = !openAboutWindow;
    openAboutWindow = !openAboutWindow;
    // WRITE A FUNCTION FOR THIS!!!!!
    // add about task to taskbar
    // if not existing already
    if (!document.getElementsByClassName("about-task")[0]) {
      let aboutTask = document.createElement("div");
      let aboutIcon = document.createElement("div");
      aboutIcon.classList.add("about-icon");
      aboutTask.appendChild(aboutIcon);
      let aboutContent = document.createTextNode("about.txt - Notepad");
      aboutTask.appendChild(aboutContent);
      aboutTask.classList.add("about-task");
      aboutTask.classList.add("clickme-about");
      let parentDiv = document.getElementById("placeholder-tasks").parentNode;
      let newDiv = document.getElementById("placeholder-tasks");
      console.log(newDiv);
      parentDiv.insertBefore(aboutTask, newDiv);
      document.getElementsByClassName("about-task")[0].classList.add("active");
    }
    for (let i = 0; i < clickmeAbout.length; i++) {
      clickmeAbout[i].onclick = function () {
        // open window
        aboutWindow.hidden = !openAboutWindow;
        openAboutWindow = !openAboutWindow;
        // activate task
        document
          .getElementsByClassName("about-task")[0]
          .classList.toggle("active");
      };
    }
  };
  // }

  // do the same for "contact" elements
  // for (let i = 0; i < clickmeContact.length; i++) {
  clickmeContact[0].onclick = function () {
    console.log("clicked contact");
    // open window
    contactWindow.hidden = !openContactWindow;
    openContactWindow = !openContactWindow;
    // add contact task to taskbar
    // if not existing already
    if (!document.getElementsByClassName("contact-task")[0]) {
      console.log(document.getElementsByClassName("contact-task"));
      let contactTask = document.createElement("div");
      let contactIcon = document.createElement("div");
      contactIcon.classList.add("contact-icon");
      contactTask.appendChild(contactIcon);
      let contactContent = document.createTextNode("contact me");
      contactTask.appendChild(contactContent);
      contactTask.classList.add("contact-task");
      contactTask.classList.add("clickme-contact");
      let parentDiv = document.getElementById("placeholder-tasks").parentNode;
      let newDiv = document.getElementById("placeholder-tasks");
      console.log(parentDiv);
      parentDiv.insertBefore(contactTask, newDiv);
      document
        .getElementsByClassName("contact-task")[0]
        .classList.add("active");
    }
    for (let i = 0; i < clickmeContact.length; i++) {
      clickmeContact[i].onclick = function () {
        // open window
        contactWindow.hidden = !openContactWindow;
        openContactWindow = !openContactWindow;

        // activate task
        document
          .getElementsByClassName("contact-task")[0]
          .classList.toggle("active");
      };
    }
  };
  // maximizing the windows

  // maximize window by click
  let maxAbout = false;
  let maxContact = false;

  // iterate over the amount of maximized elements and change styling from About
  aboutMaximize.onclick = function () {
    console.log("maxxxabout");
    aboutWindow.classList.toggle("max");
    aboutTextbox.classList.toggle("max");
    maxAbout = !maxAbout;
  };

  // same for contact
  contactMaximize.onclick = function () {
    console.log("Maxxxcontact");
    contactWindow.classList.toggle("max");
    contactTextbox.classList.toggle("max");
    maxContact = !maxContact;
  };

  // Make the desktop icons draggable
  let desktopIcons = document.getElementsByClassName("desktop-icon");

  for (let i = 0; i < desktopIcons.length; i++) {
    dragElement(desktopIcons[i]);
    console.log("hoi");
  }

  // make windows draggable
  dragElement(aboutWindow);
  dragElement(contactWindow);

  function dragElement(elmnt) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    console.log("drag");
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // // set the element's new position:
      // elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      // elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

      // define size elements
      let monitorHeight = document.getElementById("monitor").offsetHeight;
      let monitorWidth = document.getElementById("monitor").offsetWidth;
      let startHeight = document.getElementById("start").offsetHeight;
      let windowWidth = document.getElementById("window").offsetWidth;
      let windowHeight = document.getElementById("window").offsetHeight;
      let monitorHeightBorders = document.getElementById("window").clientHeight;

      // make sure window is limited to desktopsize
      if (pos4 > monitorHeight - startHeight - windowHeight) {
        elmnt.style.top = monitorHeight - startHeight - windowHeight + "px";
      } else if (pos4 < monitorHeight - monitorHeightBorders) {
        elmnt.style.top = 0 + "px";
      } else {
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      }

      if (pos3 > monitorWidth) {
        console.log("crossing borders");
        elmnt.style.left = monitorWidth - windowWidth + "px";
      } else if (pos3 < windowWidth) {
        elmnt.style.left = 0 + "px";
      } else {
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
};
