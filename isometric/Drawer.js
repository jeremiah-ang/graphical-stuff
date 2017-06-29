function Drawer (id) {
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext("2d");

	this.canvas = canvas;
	this.ctx = ctx;
}


Drawer.prototype.drawLine = function (p1, p2) {
	this.ctx.beginPath();
	this.ctx.moveTo(p1.x, p1.y);
	this.ctx.lineTo(p2.x, p2.y);
	this.ctx.stroke();
	this.ctx.closePath();
}

Drawer.prototype.drawIsometricSquare = function (square, shouldFill) {
	var self = this;
	this.ctx.beginPath();
	this.ctx.moveTo(square.base.x, square.base.y);
	square.forEach (function (pt, next_pt) {
		self.ctx.lineTo(next_pt.x, next_pt.y);
	});
	this.ctx.stroke();

	if (shouldFill)
		this.ctx.fill();

	this.ctx.closePath();

}

Drawer.prototype.clear = function () {
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}