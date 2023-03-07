const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let startX, startY;

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    const endX = e.clientX - canvas.offsetLeft;
    const endY = e.clientY - canvas.offsetTop;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    isDrawing = false;
  }
});