function IsometricSquare (x, y, offsetX, offsetY, l) {
	var base = IsometricSquare.sqCoordToIsoCoord (x, y, offsetX, offsetY, l);
	var left = IsometricSquare.sqCoordToIsoCoord (x - 1, y + 1, offsetX, offsetY, l);
	var right = IsometricSquare.sqCoordToIsoCoord (x + 1, y + 1, offsetX, offsetY, l);
	var bottom = IsometricSquare.sqCoordToIsoCoord (x, y + 2, offsetX, offsetY, l);

	this.b_left = IsometricSquare.sqCoordToIsoCoord (x - 1, y + 3, offsetX, offsetY, l);
	this.b_center = IsometricSquare.sqCoordToIsoCoord (x, y + 4, offsetX, offsetY, l);
	this.b_right = IsometricSquare.sqCoordToIsoCoord (x + 1, y + 3, offsetX, offsetY, l);

	this.base = base;
	this.left = left;
	this.right = right;
	this.bottom = bottom;

	var index = IsometricSquare.sqCoordToIndex (new Point(x, y));
	this.x = index.x;
	this.y = index.y;

	this.fill = 'black';
	this.stroke = 'black';

	this.flipped = false;
}

IsometricSquare.prototype.setFill = function (fill) { this.fill = fill; }
IsometricSquare.prototype.setStroke = function (stroke) { this.stroke = stroke; }
IsometricSquare.prototype.changeColor = function () { this.fill = "pink"; this.flipped = true; }

IsometricSquare.prototype.forEach = function (fn) {
	fn (this.base, this.left, 0);
	fn (this.left, this.bottom, 1);
	fn (this.bottom, this.right, 2);
	fn (this.right, this.base, 3);
}

IsometricSquare.prototype.outlineSquareOnly = function (drawer, shouldFill) {
	drawer.ctx.beginPath();
	drawer.ctx.moveTo(this.base.x, this.base.y);
	drawer.ctx.lineTo(this.left.x, this.left.y);
	drawer.ctx.lineTo(this.bottom.x, this.bottom.y);
	drawer.ctx.lineTo(this.right.x, this.right.y);
	drawer.ctx.lineTo(this.base.x, this.base.y);

	drawer.ctx.fillStyle = this.fill;
	drawer.ctx.fill();
	drawer.ctx.strokeStyle = this.stroke;
	drawer.ctx.stroke();

	if(!this.flipped && shouldFill) {
		drawer.ctx.fillStyle = "black";
		drawer.ctx.fill();
		drawer.ctx.strokeStyle = "red";
		drawer.ctx.stroke();
	}

	
	drawer.ctx.closePath();
}

IsometricSquare.prototype.outlineCube = function (drawer, shouldFill) {
	// outline the whole box
	drawer.ctx.beginPath();
	drawer.ctx.moveTo(this.base.x, this.base.y);
	drawer.ctx.lineTo(this.left.x, this.left.y);
	drawer.ctx.lineTo(this.b_left.x, this.b_left.y);
	drawer.ctx.lineTo(this.b_center.x, this.b_center.y);
	drawer.ctx.lineTo(this.b_right.x, this.b_right.y);
	drawer.ctx.lineTo(this.right.x, this.right.y);
	drawer.ctx.lineTo(this.base.x, this.base.y);
	drawer.ctx.fillStyle = "black";
	if(shouldFill)
		drawer.ctx.fill();
	drawer.ctx.stroke();
	drawer.ctx.closePath();

	// outline left wall
	drawer.ctx.beginPath();
	drawer.ctx.moveTo(this.left.x, this.left.y);
	drawer.ctx.lineTo(this.b_left.x, this.b_left.y);
	drawer.ctx.lineTo(this.b_center.x, this.b_center.y);
	drawer.ctx.lineTo(this.bottom.x, this.bottom.y);
	drawer.ctx.lineTo(this.left.x, this.left.y);
	drawer.ctx.stroke();
	drawer.ctx.fillStyle = "white";
	if(!shouldFill)
		drawer.ctx.fill();
	drawer.ctx.closePath();

	// outline left wall
	drawer.ctx.beginPath();
	drawer.ctx.moveTo(this.right.x, this.right.y);
	drawer.ctx.lineTo(this.b_right.x, this.b_right.y);
	drawer.ctx.lineTo(this.b_center.x, this.b_center.y);
	drawer.ctx.lineTo(this.bottom.x, this.bottom.y);
	drawer.ctx.lineTo(this.right.x, this.right.y);
	drawer.ctx.stroke();
	drawer.ctx.fillStyle = "white";
	if(!shouldFill)
		drawer.ctx.fill();
	drawer.ctx.closePath();
}

IsometricSquare.prototype.outline = function (drawer, shouldFill) {
	if (true)
		return this.outlineSquareOnly(drawer, shouldFill);

	this.outlineCube (drawer, shouldFill);
}

IsometricSquare.isoCoordToSqCoord = function (x, y, offsetX, offsetY, l) {
	x -= offsetX;
	x /= l;
	x /= Angles.cos30;

	y -= offsetY;
	y /= l;
	y /= Angles.sin30;

	return new Point(x, y);
}
IsometricSquare.sqCoordToIndex = function (point) {
	var x = point.x;
	var y = point.y;

	var _x = (x + y) / 2;
	var _y = (y - x) / 2;

	return new Point(_x, _y);
}

IsometricSquare.sqCoordToIsoCoord = function (x, y, offsetX, offsetY, l) {
	x *= Angles.cos30 * l;
	x += offsetX;

	y *= Angles.sin30 * l;
	y += offsetY;

	return new Point (x, y);
}
IsometricSquare.isoCoordToIndex = function (point) {
	var x = point.x;
	var y = point.y;

	var $x = x * 2 - y;
	var $y = y * 2 + x;

	return new Point ($x, $y);
}
