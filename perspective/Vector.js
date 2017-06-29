function Vector (p1, p2) {
	this.p1 = p1;
	this.p2 = p2;
	this.u;
}

// u = v / ||v||
Vector.prototype.normalise = function () {
	if (this.u)
		return this.u;

	var v = new Point (this.p2.x - this.p1.x, this.p2.y - this.p1.y);
	var m = Math.sqrt((v.x * v.x) + (v.y * v.y));
	var u = new Point (v.x / m, v.y / m);
	this.u = u;
	return this.u;
}

// sqrt (x1*x2 + y1*y2)
Vector.prototype.length = function () {
	return Math.sqrt(
		(this.p1.x - this.p2.x) 
		* (this.p1.x - this.p2.x) 
		+ (this.p1.y - this.p2.y) 
		* (this.p1.y - this.p2.y))
}