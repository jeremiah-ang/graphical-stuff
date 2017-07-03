function Square (points, length = null, depth = 0.1, layer = 1) {
	this.points = points;
	this.length = length;
	this.depth = depth;
	this.layer = layer;
	this.translated = false;

	this.wallColor = [
		"#999",
		"#666",
		"#555",
		"#444"
	]
}

Square.prototype.setDepth = function (depth) { this.depth = depth; }
Square.prototype.setLayer = function (layer) { this.layer = layer; }
Square.prototype.setTranslated = function (translated) { this.translated = true; }
Square.prototype.forEach = function (fn) { this.points.forEach(fn); }

Square.prototype.draw = function (drawer, vp, dotted) {
	// Zoom
	vp = this.translate ([vp], vp.yaw, vp.pitch)[0];
	var x_translated = this.translate (this.points, vp.yaw, vp.pitch);
	var zoomed = this.scale(x_translated, vp, vp.z);

	if (this.layer < 1) {
		return //(!dotted) ? drawer.drawSquare(zoomed) : null;
	} 

	// draw smaller square

	var smaller_square = this.getSmallerSquare (zoomed, vp);
	smaller_square.setTranslated (true);
	smaller_square.draw(drawer, vp, dotted);
	this.drawSmallerSquare (smaller_square, drawer, dotted);
	this.drawSideWalls (zoomed, smaller_square, drawer, dotted);
	// Draw Face of main square
	if(!dotted) drawer.drawSquare(zoomed);
}

Square.prototype.getSmallerSquare = function (bigger_square_points, vp) {
	return new Square (
		this.scale (bigger_square_points, vp, this.depth),
		this.length, this.depth, this.layer - 1
	);
}
Square.prototype.drawSmallerSquare = function (smaller_square, drawer, dotted) {
	
	// Draw Face of smaller square
	if (dotted) drawer.drawDottedSquare(smaller_square.points, 10, 0.1);
	else drawer.drawSquare(smaller_square.points);

}
Square.prototype.drawSideWalls = function (bigger_square_points, smaller_square, drawer, dotted) {
	// Draw lines connecting the corners of big square to small square
	var self = this;
	if (dotted) {
		bigger_square_points.forEach(function(point, idx){
			drawer.drawDottedLine(point, smaller_square.points[idx], 10);
		});
	} else {
		var idxs;

		if (bigger_square_points[0].y > smaller_square.points[0].y) {
			idxs = [2, 1, 3, 0];
		} else if (bigger_square_points[3].y < smaller_square.points[3].y) {
			idxs = [0, 1, 3, 2];
		} else {
			idxs = [0, 2, 1, 3];
		}

		// top
		idxs.forEach (function (idx) {
			drawer.drawQuad([
				bigger_square_points[idx],
				smaller_square.points[idx],
				smaller_square.points[(idx + 1) % 4],
				bigger_square_points[(idx + 1) % 4]],
				self.wallColor[idx],
				"white"
			);
		})
	}
	
	
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

Square.prototype.translate = function (points, offsetX, offsetY) {

	if (this.translated)
		return points;

	var translated = [];
	var new_point;
	points.forEach (function (point, idx) {
		new_point = point.clone();
		new_point.x = new_point.x + offsetX;
		new_point.y = new_point.y + offsetY;
		translated.push(new_point);
	});
	return translated;

	//return points;
}


Square.make = function (top_left, length, z) {
	var tr = new Point (top_left.x + length, top_left.y);
	var br = new Point (tr.x, tr.y + length);
	var bl = new Point (br.x - length, br.y);

	return new Square([top_left, tr, br, bl], length);
}

