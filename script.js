window.onload = function () {
  // global variables
  let closemeAbout;
  let aboutTask; //
  let contactTask;
  let aboutWindow;
  let clickmeContact;
  let closemeMariposa;

  // set clock
  setInterval(updateTime, 1000);

  // store needed objects
  let startButton = document.querySelector(".start__button");
  let startMenu = document.querySelector(".start__menu-main");
  let body = document.querySelector("body");
  let programsItem = document.querySelector(".programs");
  let programsMenu = document.querySelector(".sub__programs");
  let screenSaver = document.getElementById("screensaver");
  let shutDown = document.querySelector(".shutdown");
  aboutWindow = document.querySelector(".about-window");
  let contactWindow = document.querySelector(".contact-window");
  let clickmeAbout = document.getElementsByClassName("clickme-about");
  clickmeContact = document.getElementsByClassName("clickme-contact");
  closemeAbout = document.querySelector(".closeme-about");
  let clickAboutMenu = document.querySelector(".about");
  let clickContactMenu = document.querySelector(".contact");
  let closemeContact = document.querySelector(".closeme-contact");
  let contactMaximize = document.querySelector(".contact-maximize");
  let aboutMaximize = document.querySelector(".about-maximize");
  let aboutTextbox = document.querySelector(".textbox-about");
  let contactTextbox = document.querySelector(".textbox-contact");

  /* SCREENSAVER */

  screenSaver.hidden = true; // remove this in the end!
  // show screensaver after no mousemove
  var timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      screenSaver.hidden = false;
    }, 120000);
  };

  // hide screensaver on mouse move
  screenSaver.addEventListener("mousemove", function () {
    screenSaver.hidden = true;
  });

  // show screensaver on when "shutting down" pc
  shutDown.addEventListener("click", function () {
    screenSaver.hidden = false;
  });

  /* START MENU */
  // start menu appears on click, dissapears on click somewhere else
  body.onclick = function (e) {
    for (let i = 0, l = e.target.classList.length; i < l; ++i) {
      if (/start__.*/.test(e.target.classList[i])) {
        break;
      } else {
        startMenu.classList.remove("menu-open");
      }
    }
  };

  // show/hide menu on click
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

  // allows usage about and contact pages
  openAboutWindow = true;
  openContactWindow = true;

  /* PROJECTS */
  // MARIPOSA
  // store objects
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

  // open project when submenu clicked
  mariposaMenu.addEventListener("click", function () {
    openMariposa();
  });

  /* DRAGGABLE */
  // Make the desktop icons draggable
  let desktopIcons = document.getElementsByClassName("desktop-icon");
  for (let i = 0; i < desktopIcons.length; i++) {
    dragElement(desktopIcons[i]);
  }

  // make windows draggable
  dragElement(aboutWindow);
  dragElement(contactWindow);

  // make projects draggable
  dragElement(mariposaProject);

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

      const { innerWidth, innerHeight } = window;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // when mouse leaves monitor, leave element behind
      if (e.clientX > innerWidth || e.clientY > innerHeight) {
        return;
      }
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      limitDrag(elmnt, innerWidth, innerHeight);
    }

    function limitDrag(elmnt, innerWidth, innerHeight) {
      // define monitor & elmnt width and height
      const { width, height } = elmnt.getBoundingClientRect();
      const { offsetTop, offsetLeft, style } = elmnt;

      // limit drag function to monitor
      if (offsetTop <= 0) {
        style.top = 0 + "px";
      }
      if (offsetLeft <= 0) {
        style.left = 0 + "px";
      }

      if (offsetLeft + width >= innerWidth) {
        style.left = innerWidth - width + "px";
      }
      if (offsetTop + height >= innerHeight) {
        style.top = innerHeight - height + "px";
      }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
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

  const props = {
    menuButton: clickAboutMenu,
    windowElement: aboutWindow,
    iconClassName: "about-icon",
    taskText: "about.txt - Notepad",
  };

  const contactProps = {
    menuButton: clickContactMenu,
    windowElement: contactWindow,
    iconClassName: "contact-icon",
    taskText: "contact me",
  };

  class Window {
    constructor(props) {
      this.props = props;
      this.isOpen = false;
      this.getWindowButtons();
      this.createEventHandler();
    }

    createTask() {
      const task = document.createElement("div");
      const icon = document.createElement("div");
      const tasksList = document.getElementById("tasks");
      const content = document.createTextNode(this.props.taskText);
      icon.classList.add(this.props.iconClassName);
      task.appendChild(icon);
      task.appendChild(content);
      task.classList.add("task");
      tasksList.append(task);
      this.task = task;
      task.addEventListener("click", () => {
        this.toggleWindow();
      });
    }

    createEventHandler() {
      this.props.menuButton.addEventListener("click", () => {
        if (this.task) {
          if (!this.isOpen) {
            this.toggleWindow();
          }
          return;
        }
        this.createTask();
        this.toggleWindow();
      });
      this.maximize.addEventListener("click", () => {
        this.textbox.classList.toggle("max");
        this.props.windowElement.classList.toggle("max");
      });
      this.minimize.addEventListener("click", () => {
        this.toggleWindow();
      });
      this.close.addEventListener("click", () => {
        this.toggleWindow();
        this.task.remove();
        this.task = undefined;
      });
    }

    toggleWindow() {
      this.isOpen = !this.isOpen;
      this.props.windowElement.hidden = !this.isOpen;
      this.task.classList.toggle("active");
    }

    getWindowButtons() {
      const { windowElement } = this.props;
      this.maximize = windowElement.querySelector("[data-maximize]");
      this.minimize = windowElement.querySelector("[data-minimize]");
      this.close = windowElement.querySelector("[data-close]");
      this.textbox = windowElement.querySelector("[data-textbox]");
    }
  }

  new Window(props);
  new Window(contactProps);
};
