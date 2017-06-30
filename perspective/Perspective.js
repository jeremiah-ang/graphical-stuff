function Perspective (id) {

	var self = this;

	this.drawer = new Drawer(id);
	this.head = new Head(this.drawer.canvas);
	this.vp = new Point (250, 100, 0);

	this.squares = this.makeSquares([

		{
			x: 30,
			y: 40,
			z: 0,
			l: 100
		},

		{
			x: 175,
			y: 175,
			z: 0,
			l: 150,
		},

		{
			x: 405,
			y: 405,
			z: -0.3,
			l: 100,
		},
		
	]);

}



Perspective.prototype.start = function () {
	var self = this;
	this.head.start(
		// START
		function () {}, 

		// UPDATE
		function (point) {
			self.pointToVP(point);
			self.render();
		}
	);
}


///////////////////////////
///			VP 			///
///////////////////////////

Perspective.prototype.pointToVP = function (point) {
	point.x = point.x - this.drawer.getOffsetX();
	this.setVP (point);
}
Perspective.prototype.setVP = function (point) {
	this.vp = point;
}
Perspective.prototype.getVP = function () {
	return this.vp;
}

///////////////////////////
///	      SQUARES 	    ///
///////////////////////////

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


///////////////////////////
///		  RENDER		///
///////////////////////////

Perspective.prototype.render = function () {
	this.drawer.clear();
	this.drawer.drawSquares (this.getInfinity(), this.getVP(), true);
	this.drawer.drawSquares (this.getSquares(), this.getVP());
}