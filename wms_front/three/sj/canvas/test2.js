const canvas = document.getElementById("myCanvas");
const real_canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

const btn_create_warehouse = document.querySelector("#btn_create_warehouse")
btn_create_warehouse.addEventListener("click",()=>{
    let x = [];
    let y = [];

    x.push(line_arr[0].start_x)
    y.push(line_arr[0].start_y)

    for(let i=0;i<line_arr.length;i++){
      x.push(line_arr[i].end_x)
    }
    for(let i=0;i<line_arr.length;i++){
      y.push(line_arr[i].end_y)
    }
    window.location.href="../03_geometry_shape.html"
    localStorage.setItem("x",x)
    localStorage.setItem("y",y)
})

let isDrawing = false;
let startX, startY;

const line_arr = [];

real_canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.offsetX/8.4;
  startY = e.offsetY/8.85;
});

real_canvas.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    const endX = e.offsetX/8.4;
    const endY = e.offsetY/8.85;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    line_arr.push({start_x:startX/5,start_y:startY/5,end_x:endX/5,end_y:endY/5})

    console.log(line_arr)

    isDrawing = false;
  }
});