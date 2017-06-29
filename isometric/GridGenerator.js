function GridGenerator (x, y, ys, xs, l, drawer) {
	this.drawer = drawer;
	this.x = x;
	this.y = y;
	this.xs = xs;
	this.ys = ys;
	this.l = l;

	this.dx = Angles.cos30 * this.l;
	this.dy = Angles.sin30 * this.l;

	this.squares = this.generate();
}

GridGenerator.prototype.generate = function () {
	var squares = [];

	for (var i = 0; i < this.xs; i++) {
		squares[i] = [];
		var x = -i;
		var y = i;
		for (var j = 0; j < this.ys; j++) {
			squares[i].push(new IsometricSquare (x, y, this.x, this.y, this.l));
			x += 1;
			y += 1;
		}
	}
	return squares;
}

GridGenerator.prototype.render = function (x, y) {
	var self = this;
	//console.log(x, y);

	this.drawer.clear();
	var coord = IsometricSquare.sqCoordToIndex(IsometricSquare.isoCoordToSqCoord(x, y, this.x, this.y, this.l));
	var square;
	for (var i = 0; i < this.xs; i++) {
		for (var j = 0; j < this.ys; j++) {
			square = this.squares[i][j]
			this.drawer.drawIsometricSquare(this.squares[i][j], false);
		}
	}

	if (this.squares[Math.floor(coord.y)] && this.squares[Math.floor(coord.y)][Math.floor(coord.x)])
		this.drawer.drawIsometricSquare(this.squares[Math.floor(coord.y)][Math.floor(coord.x)], true);
}

GridGenerator.prototype.click = function (x, y) {
	var coord = IsometricSquare.sqCoordToIndex(IsometricSquare.isoCoordToSqCoord(x, y, this.x, this.y, this.l));
	if (this.squares[Math.floor(coord.y)] && this.squares[Math.floor(coord.y)][Math.floor(coord.x)])
		this.squares[Math.floor(coord.y)][Math.floor(coord.x)].changeColor();
	this.render();
}
