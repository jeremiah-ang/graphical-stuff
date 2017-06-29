function Perspective () {

	var self = this;

	this.drawer = new Drawer("perspective");

	this.x = 250;
	this.y = 100;
	this.head = new Head();

	this.squares = this.makeSquares([
		{
			x: 175,
			y: 175,
			l: 150,
		},
		{
			x: 30,
			y: 40,
			l: 100
		}
	]);

}



Perspective.prototype.start = function () {
	var self = this;
	this.head.start(function () {
	}, function (x, y) {
		self.setVP(x - self.drawer.getOffsetX(),y);
	});
}

Perspective.prototype.setVP = function (x, y) {
	this.x = x;
	this.y = y;
	this.render();
}

Perspective.prototype.makeSquares = function (arr) {
	arr.forEach(function (sq, idx) {
		arr[idx] = Square.make(new Point(sq.x, sq.y), sq.l);
	});
	return arr;
}
Perspective.prototype.getSquares = function () { return this.squares; }

Perspective.prototype.getInfinity = function () {
	var canvas = this.drawer.canvas;
	var maxW = canvas.width;
	var infinity = [];

	var s = Square.make(new Point(0, 0), maxW);
	s.setDepth(0.2);
	s.setLayer(5);
	infinity.push(s);

	return infinity;
}

Perspective.prototype.getVP = function () {
	return new Point(this.x, this.y);
}
Perspective.prototype.render = function () {
	this.drawer.clear();

	this.drawer.drawSquares (this.getSquares(), this.getVP());
	this.drawer.drawSquares (this.getInfinity(), this.getVP(), true);
}