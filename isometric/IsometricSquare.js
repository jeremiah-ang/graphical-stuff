function IsometricSquare (x, y, offsetX, offsetY, l) {
	this.pos = {
		x: offsetX + x * Angles.cos30 * l,
		y: offsetY + y * Angles.sin30 * l
	}

	var base = new Point (this.pos.x, this.pos.y);
	var left = new Point (
		this.pos.x - Angles.cos30 * l,
		this.pos.y + Angles.sin30 * l
	);
	var right = new Point (
		this.pos.x + Angles.cos30 * l,
		this.pos.y + Angles.sin30 * l
	);
	var top = new Point (
		this.pos.x,
		this.pos.y + l
	);

	this.base = base;
	this.left = left;
	this.right = right;
	this.top = top;

	this.x = (x + y) / 2;
	this.y = (y - x) / 2;
}

IsometricSquare.prototype.forEach = function (fn) {
	fn (this.base, this.left, 0);
	fn (this.left, this.top, 1);
	fn (this.top, this.right, 2);
	fn (this.right, this.base, 3);
}

IsometricSquare.fromIsometric = function (x, y, offsetX, offsetY, l) {
	x -= offsetX;
	x /= l;
	x /= Angles.cos30;

	y -= offsetY;
	y /= l;
	y /= Angles.sin30;

	var _x = (x + y) / 2;
	var _y = (y - x) / 2;

	return new Point(_x, _y);
}
IsometricSquare.toIsometric = function (x, y) {
	
}
IsometricSquare.prototype.isSelected = function (_x, _y) {
	return (_x > this.x && _x < this.x + 1 && _y > this.y && _y < this.y + 1)
}
