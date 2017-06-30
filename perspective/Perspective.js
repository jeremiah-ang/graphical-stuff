function Perspective (id) {

	var self = this;

	this.drawer = new Drawer(id);
	this.head = new Head(this.drawer.canvas);
	this.vp = new Point (250, 100, 0);

	this.squares = this.makeSquares([
		{
			x: 175,
			y: 175,
			z: 0,
			l: 150,
		},
		{
			x: 30,
			y: 40,
			z: 0,
			l: 100
		}
	]);

}



Perspective.prototype.start = function () {
	var self = this;
	this.head.start(
		// START
		function () {}, 

		// UPDATE
		function (x, y, z) {
			self.setVP(x - self.drawer.getOffsetX(),y,z);
			self.render();
		}
	);
}


///////////////////////////
///			VP 			///
///////////////////////////

Perspective.prototype.setVP = function (x, y, z) {
	this.vp.x = x;
	this.vp.y = y;
	this.vp.z = z;
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
	this.drawer.drawSquares (this.getSquares(), this.getVP());
	//this.drawer.drawSquares (this.getInfinity(), this.getVP(), true);
}