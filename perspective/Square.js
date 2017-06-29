function Square (top_left, top_right, bottom_right, bottom_left, length = null, depth = 0.1, layer = 1) {
	this.tl = top_left;
	this.tr = top_right;
	this.br = bottom_right;
	this.bl = bottom_left;
	this.length = length;
	this.depth = depth;
	this.layer = layer;
}

Square.prototype.setDepth = function (depth) { this.depth = depth; }
Square.prototype.setLayer = function (layer) { this.layer = layer; }

Square.prototype.forEach = function (fn) {
	fn(this.tl, 0);
	fn(this.tr, 1);
	fn(this.br, 2);
	fn(this.bl, 3);
}

Square.prototype.draw = function (drawer, vp, dotted) {
	if (this.layer < 1) {
		return (!dotted) ? drawer.drawSquare(this) : null;
	} 

	var points = this.calculateSmallerSquarePoints (vp);
	var smaller_square = new Square (points[0], points[1], points[2], points[3], this.length, this.depth, this.layer - 1);
	

	if (dotted)
		drawer.drawDottedSquare(smaller_square, 10, 0.1);
	else drawer.drawSquare(smaller_square);


	this.forEach(function(point, idx){
		if (dotted) 
			drawer.drawDottedLine(point, points[idx], 10);
		else drawer.drawLine(point, points[idx], 10);
	});

	smaller_square.draw(drawer, vp, dotted);

	if(!dotted)
		drawer.drawSquare(this);
};

Square.prototype.calculateSmallerSquarePoints = function (vp) {
	var points = [];
	var ratio = this.depth;
	this.forEach(function(point){
		var v = new Vector(point, vp);
		var depth = v.length() * ratio;
		var u = v.normalise();
		var p = new Point(point.x + depth * u.x, point.y + depth * u.y);
		points.push(p);
	});

	return points;
}


Square.make = function (top_left, length) {
	var tr = new Point (top_left.x + length, top_left.y);
	var br = new Point (tr.x, tr.y + length);
	var bl = new Point (br.x - length, br.y);
	return new Square(top_left, tr, br, bl, length);
}

