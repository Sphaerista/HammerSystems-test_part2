var count = 0;
const dropSection = document.getElementById("zonedrop");
const placeToDrop = document.querySelectorAll(".placeToDrop");

function dropToConvert(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const nodeCopy = document.getElementById(id).cloneNode(true);
  nodeCopy.id = id + "_" + count++;
  nodeCopy.classList.add("movable");
  nodeCopy.style.position = "absolute";

  drag_div(nodeCopy);
  event.target.appendChild(nodeCopy);
}

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}
function onDropStop(event) {
  event.preventDefault();
  const els = document.getElementsByClassName("movable");
  for (const el of els) {
    el.style.backgroundColor = "rgb(255, 244, 228)";
  }
}
function onDragOver(event) {
  event.preventDefault();
  const els = event.target.children;
  for (const el of els) {
    el.style.backgroundColor = "rgb(254, 243, 227)";
  }
}
function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropZone = event.target;

  draggableElement.style.backgroundColor = "blanchedalmond";

  if (dropZone.classList.value === "example-draggable") {
    console.log("here");
  } else {
    dropZone.appendChild(draggableElement);
  }
  console.log(id, dropZone.classList.value);
  event.dataTransfer.clearData();
}

//Drag absolutely
function drag_div(div_id) {
  let mousePosition;
  let offset = [0, 0];
  let div;
  let isDown = false;

  let currentDroppable = null;
  div = div_id;

  div.addEventListener(
    "mousedown",

    function (e) {
      (div.style.backgroundColor = "rgb(245, 174, 67)"), (isDown = true);
      offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
    }
  );

  div.addEventListener("mouseup", function () {
    (div.style.backgroundColor = ""), (isDown = false);
  });

  div.addEventListener("mousemove", function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      div.style.left = mousePosition.x + offset[0] + "px";
      div.style.top = mousePosition.y + offset[1] + "px";
    }
    if (event.clientX <= 35) {
      div.style.left = 35 + offset[0] + "px";
    }
    if (event.clientX >= 475) {
      div.style.left = 475 + offset[0] + "px";
    }
    if (event.clientY <= 265) {
      div.style.top = 265 + offset[1] + "px";
    }
    if (event.clientY >= 700) {
      div.style.top = 700 + offset[1] + "px";
    }

    // for trashbin
    div.hidden = true;
    let elemBelow = document.elementsFromPoint(event.clientX, event.clientY);
    div.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = null;
    if (elemBelow[1].className === "trashbin") {
      droppableBelow = elemBelow[1];
    }
    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        enterDroppable(currentDroppable);
        console.log("hide here");
        div.remove();
        setTimeout(() => {
          leaveDroppable(currentDroppable);
        }, 250);
      }
    }
  });
}

let archive = [null];
const plan = document.querySelector(".frivolous");
function onSave2D() {
  const docSaved = [...plan.children];
  let archivePos = [];
  for (const object of docSaved) {
    const objCopy = object.cloneNode(true);
    objCopy.id = objCopy.id + "_" + "copy";
    archivePos.push(objCopy);
  }
  archive.push(archivePos);
  console.log(archive);
}
function onLoad2D() {
  plan.innerHTML = "";
  if (archive.length === 0) {
    return alert(`There are no saved files`);
  }
  let sign = prompt("Which file to laod? Write an index");
  console.log(sign);
  if (sign < 1 || sign > archive.length - 1) {
    return alert(`Wrong index. Number of indexes are ${archive.length - 1} `);
  }
  let array = [...archive[sign]];
  console.log(array);
  for (const el of array) {
    plan.appendChild(el);
    drag_div(el);
    console.log(el);
  }
}
function onReset2D() {
  plan.innerHTML = "";
}
function onClearFiles() {
  archive = [];
  alert(`All saved files were deleted`);
}

function enterDroppable(elem) {
  elem.style.backgroundColor = "rgb(250, 179, 179,0.5)";
}

function leaveDroppable(elem) {
  elem.style.background = "";
}
