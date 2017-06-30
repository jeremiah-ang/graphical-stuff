function Drawer (canvasId) {
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext("2d");
	this.canvas = canvas;
	this.ctx = ctx;
}

// takes in 2 point object
// draws from start to end
Drawer.prototype.drawLine = function (start, end) {
	this.ctx.beginPath();
	this.ctx.moveTo(start.x, start.y);
	this.ctx.lineTo(end.x, end.y);
	this.ctx.stroke();
	this.ctx.closePath();
}

// takes in 2 point object
// draws from start to end
Drawer.prototype.drawDottedLine = function (start, end, steps, size = 0) {
	
	this.ctx.beginPath();

	var sx = start.x;
	var sy = start.y;
	var dx = (end.x - start.x) / steps;
	var dy = (end.y - start.y) / steps;

	this.ctx.moveTo(start.x, start.y);
	for (var i = 0; i < steps / 2; i++) {

		this.ctx.arc(sx, sy, size, 0, 2 * Math.PI)
		this.ctx.fill();

		sx = sx + dx;
		sy = sy + dy;
		// this.ctx.lineTo(sx, sy);
		this.ctx.stroke();
		sx = sx + dx;
		sy = sy + dy;
		this.ctx.moveTo(sx, sy);
	}
	this.ctx.closePath();
	
}

Drawer.prototype.getOffsetX = function () { 
	var screenWidth = window.innerWidth;
	var canvasWidth = this.canvas.width;
	return (screenWidth - canvasWidth) / 2;
}

Drawer.prototype.drawDottedSquare = function (square_points, steps, size = 1) {
	this.ctx.beginPath();
	this.ctx.fillStyle = "white";
	this.ctx.strokeStyle = "black";

	for (var i = 1; i < square_points.length; i++) {
		this.drawDottedLine (square_points[i - 1], square_points[i], steps, size);
	}
	this.drawDottedLine (square_points[3], square_points[0], steps, size);

}

Drawer.prototype.drawSquare = function (square_points) {

	this.drawQuad (square_points, "#333", "white");

}

// vp stands for vaninshing point
Drawer.prototype.drawSquares = function (squares, vp, dotted = false) {
	var self = this;
	squares.forEach (function (square) {
		square.draw(self, vp, dotted);
	});
}

Drawer.prototype.drawQuad = function (pts, fill, stroke) {
	this.ctx.beginPath();
	this.ctx.fillStyle = fill;
	this.ctx.strokeStyle = stroke;

	this.ctx.moveTo (pts[0].x, pts[0].y);
	for (var i = 0; i < pts.length; i++) {
		this.ctx.lineTo (pts[i].x, pts[i].y);
	}
	this.ctx.lineTo (pts[0].x, pts[0].y);

	this.ctx.stroke();
	this.ctx.fill();

	this.ctx.closePath();
}

Drawer.prototype.clear = function () {
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}