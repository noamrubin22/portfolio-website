window.onload = function () {
  let projectWindow = document.querySelector(".window");
  let clickme = document.querySelector(".clickme");
  let closeme = document.querySelector(".closeme");

  openWindow = false;

  clickme.onclick = function () {
    console.log("clicked");
    // open window
    projectWindow.hidden = !openWindow;
    openWindow = !openWindow;
  };

  closeme.onclick = function () {
    console.log("closed");
    // close window
    projectWindow.hidden = true;
    openWindow = !openWindow;
  };

  // Make the desktop icons draggable
  dragElement(projectWindow);

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      console.log(pos3, pos4);
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
      console.log(pos1, pos2);
      //set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
};

// $(".clickme").toggleClass("active");
// $(".window").draggable({
//   handle: ".titlebar",
// });

// $(".closeme").click(function () {
//   $(".window").hide();
//   $(".clickme").toggleClass("active");
// });

// $(".clickme").click(function () {
//   $(".window").show();
//   $(".clickme").toggleClass("active");
// });

// $(".checkbox").click(function () {
//   $(this).toggleClass("checked");
// });
