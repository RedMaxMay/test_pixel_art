const grid = document.getElementById("grid");
const btns = document.querySelectorAll("#add");
const btnsContainer = document.querySelector(".btns");
const colorsContainer = document.querySelector(".colors");
const saveButton = document.getElementById("saveButton");

let isDrawing = false;

const colorsList = [
  "black",
  "white",
  "gray",
  "silver",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
];

colorsList.forEach((color) => {
  let div = document.createElement("div");
  div.classList.add("color_item");
  div.style.background = color;
  div.setAttribute("name", color);
  colorsContainer.append(div);
});

colorsContainer.addEventListener("click", (e) => {
  const colorsBtns = document.querySelectorAll(".color_item");

  if (e.target.className === "color_item") {
    colorsBtns.forEach((btn) => btn.classList.remove("selected_color"));
    e.target.classList.add("selected_color");
  }
});

btnsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    saveButton.style.display = "block";

    const btn = e.target;
    btns.forEach((btn) => btn.classList.remove("selected_btn"));
    btn.classList.add("selected_btn");

    const gridSize = btn.name * btn.name;
    grid.className = "";
    grid.innerHTML = "";
    grid.classList.add(`grid${btn.name}`);

    for (let i = 0; i < gridSize; i++) {
      let div = document.createElement("div");
      div.classList.add("square");
      grid.append(div);
    }
  }
});

/* Mouse Events */

grid.addEventListener("mousedown", (e) => {
  const selectedColor = document.querySelector(".selected_color");
  const color = selectedColor?.getAttribute("name");

  isDrawing = true;

  if (e.target.className === "square") {
    const square = e.target;
    square.style.backgroundColor = color;
  }
});

grid.addEventListener("mousemove", (e) => {
  const selectedColor = document.querySelector(".selected_color");
  const color = selectedColor?.getAttribute("name");

  if (e.target.className === "square" && isDrawing) {
    const square = e.target;
    square.style.backgroundColor = color;
  }
});

grid.addEventListener("mouseup", () => {
  isDrawing = false;
});

grid.addEventListener("mouseleave", () => {
  isDrawing = false;
});

/* Mobile Events */

grid.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const selectedColor = document.querySelector(".selected_color");
  const color = selectedColor?.getAttribute("name");

  isDrawing = true;

  if (e.target.className === "square") {
    const square = e.target;
    square.style.backgroundColor = color;
  }
});

grid.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const selectedColor = document.querySelector(".selected_color");
  const color = selectedColor?.getAttribute("name");

  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  if (target && target.classList.contains("square") && isDrawing) {
    target.style.backgroundColor = color;
  }
});

grid.addEventListener("touchend", (e) => {
  e.preventDefault();
  isDrawing = false;
});

/* Save image */

saveButton.addEventListener("click", () => {
  html2canvas(grid, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "my_painting.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
