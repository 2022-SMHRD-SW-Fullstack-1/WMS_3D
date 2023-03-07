import { Line } from "../line.js";


const zoomElement = document.querySelector("#canvas");
const background_img = document.querySelector("#background_img")



let zoom = 1.5;
const ZOOM_SPEED = 0.05;
zoomElement.style.transform = 'scale(1.5)'
background_img.style.transform = zoomElement.style.transform 

document.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    if(zoomElement.style.transform != "scale(0.2)"){
    zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
    background_img.style.transform = zoomElement.style.transform 

    }
  } else {
        zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
        background_img.style.transform = zoomElement.style.transform 

  }
});



class App {
    constructor () {
        this.canvas = document.getElementById("canvas")


        this.start = {x:0,y:0}

        document.body.appendChild(this.canvas);
    

        this.ctx = this.canvas.getContext('2d');


        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        this.pos = {};

        this.line = new Line();

        window.requestAnimationFrame(this.animate.bind(this));

        this.canvas.addEventListener('mousedown', this.onDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMove.bind(this));

    }

    resize () {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate () {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.line.draw(this.ctx);
    }

    onDown (e) {
        this.pos.x = e.offsetX;
        this.pos.y = e.offsetY;

        this.start = {x:e.offsetX,y:e.offsetY}

        this.line.onDown(this.pos.x, this.pos.y);
    }

    onMove (e) {
        this.pos.x = e.offsetX;
        this.pos.y = e.offsetY;

        this.line.onMove(this.pos.x, this.pos.y);
    }

    onUp (e) {
        this.pos.x = e.offsetX;
        this.pos.y = e.offsetY;

        this.line.onUp(this.pos.x, this.pos.y);

    }


}

window.onload = () => {
    new App();
}