window.onload = function () {
  // global variables
  let closemeAbout;
  let aboutTask;
  let contactTask;
  let aboutWindow;
  let clickmeContact;
  let closemeMariposa;

  // clock should be correct
  setInterval(updateTime, 1000);

  // Store the necessary objects
  let startButton = document.querySelector(".start__button");

  let startMenu = document.querySelector(".start__menu-main");

  let body = document.querySelector("body");

  let programsItem = document.querySelector(".programs");

  let programsMenu = document.querySelector(".sub__programs");

  let screenSaver = document.getElementById("screensaver");

  let shutDown = document.querySelector(".shutdown");
  screenSaver.hidden = true;

  // SCREENSAVER
  //show screensaver after if mouse is not moving for 2 min
  var timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      screenSaver.hidden = false;
    }, 120000);
  };

  // hide screensaver on move
  screenSaver.addEventListener("mousemove", function () {
    screenSaver.hidden = true;
  });

  // activate screensaver on click of shut down computer
  shutDown.addEventListener("click", function () {
    screenSaver.hidden = false;
  });

  // STARTMENU
  // Start menu appear on click of start button and disappear on click of start button or anything else except the menu
  body.onclick = function (e) {
    for (let i = 0, l = e.target.classList.length; i < l; ++i) {
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

  programsItem.addEventListener("click", function () {
    menuDisplay(programsMenu);
  });

  // Make a click on the tasks open the pages
  aboutWindow = document.querySelector(".about-window");
  let contactWindow = document.querySelector(".contact-window");
  let clickmeAbout = document.getElementsByClassName("clickme-about");

  clickmeContact = document.getElementsByClassName("clickme-contact");
  closemeAbout = document.querySelector(".closeme-about");
  console.log(closemeAbout);
  let clickAboutMenu = document.querySelector(".about");
  let clickContactMenu = document.querySelector(".contact");
  let closemeContact = document.querySelector(".closeme-contact");
  console.log(closemeContact);
  let contactMaximize = document.querySelector(".contact-maximize");
  let aboutMaximize = document.querySelector(".about-maximize");
  console.log(aboutMaximize);
  console.log(contactMaximize);
  let aboutTextbox = document.querySelector(".textbox-about");
  let contactTextbox = document.querySelector(".textbox-contact");

  openAboutWindow = true;
  openContactWindow = true;

  // make sure that all "about" elements opening the window

  // clickmeAbout[0].onclick = function () {
  clickAboutMenu.onclick = function () {
    console.log("clickd menu about");
    // activate task
    // if (aboutTask) {
    //   aboutTask.classList.toggle("active");
    // }
    // for (let i = 0; i < clickmeAbout.length; i++) {
    console.log("clicked about");
    // aboutWindow.hidden = false;
    aboutWindow.hidden = !openAboutWindow;
    openAboutWindow = !openAboutWindow;
    // add about task to taskbar
    createAboutTask();
    // }
    for (let i = 0; i < clickmeAbout.length; i++) {
      clickmeAbout[i].onclick = function () {
        // open window
        aboutWindow.hidden = !openAboutWindow;
        openAboutWindow = !openAboutWindow;
        // activate task
        if (aboutTask) {
          aboutTask.classList.toggle("active");
        }
      };
    }
  };

  // do the same for "contact" elements
  // if menu item "contact" is clicked
  clickContact();
  function clickContact() {
    clickContactMenu.onclick = function () {
      console.log("clicked contact");
      // open window
      contactWindow.hidden = !openContactWindow;
      openContactWindow = !openContactWindow;

      // activate starfield
      starField();
      // add contact task to taskbar
      createContactTask();
      console.log("clickMECONTACT", clickmeContact);
      clickmeContact = document.getElementsByClassName("clickme-contact");
      for (let i = 0; i < clickmeContact.length; i++) {
        clickmeContact[i].onclick = function () {
          // open window
          contactWindow.hidden = !openContactWindow;
          openContactWindow = !openContactWindow;

          starField();
          // activate task
          if (contactTask) {
            contactTask.classList.toggle("active");
          }
        };
      }
    };
  }

  // close window
  closemeContact.onclick = function () {
    contactTask.remove();
    clickmeContact = document.getElementsByClassName("clickme-contact");
    contactWindow.hidden = true;
    console.log("CLOSE CONTACT");
    clickContactMenu.onclick = function () {
      createContactTask();
      contactWindow.hidden = false;
      clickContact();
    };
  };
  // close window
  closemeAbout.onclick = function () {
    aboutTask.remove();
    aboutWindow.hidden = true;
    console.log("CLOSE ABOUT");
    clickAboutMenu.onclick = function () {
      createAboutTask();
      aboutWindow.hidden = false;
    };
  };
  // maximizing the windows
  // maximize window by click
  let maxAbout = false;
  let maxContact = false;

  // iterate over the amount of maximized elements and change styling from About
  aboutMaximize.onclick = function () {
    aboutWindow.classList.toggle("max");
    aboutTextbox.classList.toggle("max");
    maxAbout = !maxAbout;
  };

  // same for contact
  contactMaximize.onclick = function () {
    contactWindow.classList.toggle("max");
    contactTextbox.classList.toggle("max");
    starField();
    maxContact = !maxContact;
  };

  // Projects-pages
  // MARIPOSA
  // locate elements
  let mariposaProject = document.getElementsByClassName("mariposa-project")[0];
  let mariposaDesktop = document.querySelector(".mariposa");
  let mariposaMenu = document.querySelector(".mariposa-menu");
  closemeMariposa = document.querySelector(".closeme-mariposa");
  let mariposaMaximize = document.querySelector(".mariposa-maximize");
  let clickmeMariposa = document.getElementsByClassName("clickme-mariposa");

  // open project when doubleclick on desktop icon
  mariposaDesktop.addEventListener("dblclick", function () {
    openMariposa();
  });

  // open project when clicked through submenu
  mariposaMenu.addEventListener("click", function () {
    openMariposa();
  });

  // DRAGGABLE
  // Make the desktop icons draggable
  let desktopIcons = document.getElementsByClassName("desktop-icon");

  for (let i = 0; i < desktopIcons.length; i++) {
    dragElement(desktopIcons[i]);
  }
  // make projects draggable
  dragElement(mariposaProject);

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

      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

      // define size elements
      // let monitorHeight = document.getElementById("monitor").offsetHeight;
      // let monitorWidth = document.getElementById("monitor").offsetWidth;
      // let startHeight = document.getElementById("start").offsetHeight;
      // let windowWidth = document.getElementById("window").offsetWidth;
      // let windowHeight = document.getElementById("window").offsetHeight;
      // let monitorHeightBorders = document.getElementById("window").clientHeight;

      // make sure window is limited to desktopsize
      // if (pos4 > monitorHeight - startHeight - windowHeight) {
      //   elmnt.style.top = monitorHeight - startHeight - windowHeight + "px";
      // } else if (pos4 < monitorHeight - monitorHeightBorders) {
      //   elmnt.style.top = 0 + "px";
      // } else {
      //   elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      // }

      // if (pos3 > monitorWidth) {
      //   console.log("crossing borders");
      //   elmnt.style.left = monitorWidth - windowWidth + "px";
      // } else if (pos3 < windowWidth) {
      //   elmnt.style.left = 0 + "px";
      // } else {
      //   elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      // }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function createAboutTask() {
    if (!document.querySelector(".about-task")) {
      console.log("about is not there and we are creating it now");
      aboutTask = document.createElement("div");
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
    // make sure taskbar is still responsive
    aboutTask.onclick = function () {
      aboutWindow.hidden = !openAboutWindow;
      openAboutWindow = !openAboutWindow;
      aboutTask.classList.toggle("active");
    };
  }

  function createContactTask() {
    // if not existing already
    if (!document.getElementsByClassName("contact-task")[0]) {
      contactTask = document.createElement("div");
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
    // make sure taskbar is still responsive
    contactTask.onclick = function () {
      contactWindow.hidden = !openContactWindow;
      openContactWindow = !openContactWindow;
      starField();
      contactTask.classList.toggle("active");
    };
  }

  function openMariposa() {
    // change color desktop icon
    mariposaDesktop.style.backgroundColor = "#00207d";
    setInterval(function () {
      mariposaDesktop.style.backgroundColor = "transparent";
    }, 300);

    // open project window
    mariposaProject.hidden = false;
    openMariposaProject = true;
    // add Mariposa to taskbar
    createMariposaTask();

    // make sure all right-side buttons work
    closeMariposa();
    maxMariposa();
    openMinimizeMariposa();

    function createMariposaTask() {
      if (!document.querySelector(".mariposa-task")) {
        console.log("mariposa is not there and we are creating it now");
        mariposaTask = document.createElement("div");
        let mariposaIcon = document.createElement("div");
        mariposaIcon.classList.add("mariposa-icon");
        mariposaTask.appendChild(mariposaIcon);
        let mariposaContent = document.createTextNode("mariposa.txt - Notepad");
        mariposaTask.appendChild(mariposaContent);
        mariposaTask.classList.add("mariposa-task");
        mariposaTask.classList.add("clickme-mariposa");
        let parentDiv = document.getElementById("placeholder-tasks").parentNode;
        let newDiv = document.getElementById("placeholder-tasks");
        console.log(newDiv);
        parentDiv.insertBefore(mariposaTask, newDiv);
        document
          .getElementsByClassName("mariposa-task")[0]
          .classList.add("active");
      }
      // make sure taskbar is still responsive
      mariposaTask.onclick = function () {
        mariposaProject.hidden = !openMariposaProject;
        openMariposaProject = !openMariposaProject;
        mariposaTask.classList.toggle("active");
      };
    }

    function closeMariposa() {
      // close window
      closemeMariposa.onclick = function () {
        mariposaTask.remove();
        clickmeMariposa = document.getElementsByClassName("clickme-mariposa");
        mariposaProject.hidden = true;
        console.log("CLOSE Mariposa");
        clickmeMariposa.onclick = function () {
          createMariposaTask();
          MariposaProject.hidden = false;
          clickmeMariposa();
        };
      };
    }

    function maxMariposa() {
      console.log(mariposaMaximize);
      let maxMariposa = false;
      mariposaMaximize.onclick = function () {
        console.log("MAXXXXXX");
        mariposaProject.classList.toggle("max");
        // mariposaTextbox.classList.toggle("max");
        maxMariposa = !maxMariposa;
      };
    }

    function openMinimizeMariposa() {
      // project is minized/opened when clicked on on the minimize button or task
      for (let i = 0; i < clickmeMariposa.length; i++) {
        clickmeMariposa[i].onclick = function () {
          // open window
          mariposaProject.hidden = !openMariposaProject;
          openMariposaProject = !openMariposaProject;
          // change styling task
          if (mariposaTask) {
            mariposaTask.classList.toggle("active");
          }
        };
      }
    }
  }
};
