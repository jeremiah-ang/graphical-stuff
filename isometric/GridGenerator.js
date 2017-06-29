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
	// for (var i = 0; i < this.xs; i++) {
	// 	var x = this.x - i * Angles.cos30 * this.l;
	// 	var y = this.y - i * Angles.sin30 * this.l;
	// 	for (var j = 0; j < this.ys; j++) {
	// 		squares.push(new IsometricSquare (x, y, this.l));

	// 		x += Angles.cos30 * this.l;
	// 		y -= Angles.sin30 * this.l;
	// 	}
	// }

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
	var coord = IsometricSquare.fromIsometric(x, y, this.x, this.y, this.l);
	var square;
	for (var i = 0; i < this.xs; i++) {
		for (var j = 0; j < this.ys; j++) {
			square = this.squares[i][j]
			this.drawer.drawIsometricSquare(this.squares[i][j], square.isSelected(coord.x, coord.y));
		}
	}
}
