const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener('mouseup', (e) => {
  isDrawing = false;
});

canvas.addEventListener('dblclick', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
