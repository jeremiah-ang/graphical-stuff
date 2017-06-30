function Square (points, length = null, depth = 0.1, layer = 1) {
	this.points = points;
	this.length = length;
	this.depth = depth;
	this.layer = layer;
}

Square.prototype.setDepth = function (depth) { this.depth = depth; }
Square.prototype.setLayer = function (layer) { this.layer = layer; }
Square.prototype.forEach = function (fn) { this.points.forEach(fn); }

Square.prototype.draw = function (drawer, vp, dotted) {
	// Zoom
	var zoomed = this.scale(this.points, vp, vp.z);

	if (this.layer < 1) {
		return //(!dotted) ? drawer.drawSquare(zoomed) : null;
	} 

	// draw smaller square
	this.drawSmallerSquare (zoomed, drawer, vp, dotted);
	// Draw Face of main square
	if(!dotted)
		drawer.drawSquare(zoomed);
}

Square.prototype.drawSmallerSquare = function (bigger_square_points, drawer, vp, dotted) {
	// Smaller Square

	var smaller_square_points = this.scale (bigger_square_points, vp, this.depth);
	var smaller_square = new Square (
		smaller_square_points,
		this.length, this.depth, this.layer - 1);
	
	// Draw Face of smaller square
	if (dotted)
		drawer.drawDottedSquare(smaller_square_points, 10, 0.1);
	else drawer.drawSquare(smaller_square_points);

	// Draw lines connecting the corners of big square to small square
	bigger_square_points.forEach(function(point, idx){
		if (dotted) 
			drawer.drawDottedLine(point, smaller_square_points[idx], 10);
		else drawer.drawLine(point, smaller_square_points[idx], 10);
	});

	// Draw smaller square of smalelr square
	smaller_square.draw(drawer, vp, dotted);
}

Square.prototype.scale = function (initial_points, vp, ratio) {
	var points = [];
	initial_points.forEach(function(point){
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
	return new Square([top_left, tr, br, bl], length);
}

