let isDown = false;

export class Line {
    constructor () {
        this.point = {}
        this.pointLine = {}
        this.pointEnd = {}
    }

    draw (ctx) {
        if (this.point.x === undefined || this.point.y === undefined) {
            ctx.fillStyle = 'transparent';
        } else {
            ctx.fillStyle = '#00007e';
        }
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();

        this.drawLine(ctx);
        this.drawLastPoint(ctx);
    } 

    drawLine (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.point.x, this.point.y);
        ctx.lineTo(this.pointLine.x, this.pointLine.y);
        ctx.strokeStyle = '#00007e';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    drawLastPoint (ctx) {
        ctx.beginPath();
        ctx.arc(this.pointEnd.x, this.pointEnd.y, 2, 0, Math.PI * 2, true);

        if (isDown) {
            ctx.fillStyle = 'transparent';
        }

        ctx.fill();
        ctx.closePath();
    }

    onDown (x, y) {
        this.point.x = x;
        this.point.y = y;
        this.pointLine.x = x;
        this.pointLine.y = y;

        isDown = true;
    }

    onMove (x, y) {
        if (isDown) {
            this.pointLine.x = x;
            this.pointLine.y = y;
        }
    }

    onUp (x, y) {
        this.pointEnd.x = x;
        this.pointEnd.y = y;

        isDown = false;
    }
}