function IsometricSquare (x, y, offsetX, offsetY, l) {
	var base = IsometricSquare.sqCoordToIsoCoord (x, y, offsetX, offsetY, l) 
	var left = IsometricSquare.sqCoordToIsoCoord (x - 1, y + 1, offsetX, offsetY, l) 
	var right = IsometricSquare.sqCoordToIsoCoord (x + 1, y + 1, offsetX, offsetY, l) ;
	var bottom = IsometricSquare.sqCoordToIsoCoord (x, y + 2, offsetX, offsetY, l) 

	this.base = base;
	this.left = left;
	this.right = right;
	this.bottom = bottom;

	var index = IsometricSquare.sqCoordToIndex (new Point(x, y));
	this.x = index.x;
	this.y = index.y;
}

IsometricSquare.prototype.forEach = function (fn) {
	fn (this.base, this.left, 0);
	fn (this.left, this.bottom, 1);
	fn (this.bottom, this.right, 2);
	fn (this.right, this.base, 3);
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
