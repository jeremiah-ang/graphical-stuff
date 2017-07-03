function Point (x, y, z = 0, pitch = 0, roll = 0, yaw = 0) {
	this.x = x;
	this.y = y;
	this.z = z;

	// pitch up to down 
	// roll side ways 
	// yaw left to right

	this.pitch = pitch;
	this.roll = roll;
	this.yaw = yaw;
}

Point.prototype.calibrate = function (calibrated) {
	var p = new Point(0, 0);
	var self = this;
	p.forEachPoint(function (key) {
		p[key] = calibrated[key] - self[key];
	});
	return p;
}

Point.prototype.forEachPoint = function (fn) {
	fn ('x');
	fn ('y');
	fn ('z');
	fn ('pitch');
	fn ('roll');
	fn ('yaw');
}

Point.prototype.clone = function () {
	return new Point (
			this.x,
			this.y,
			this.z,
			this.pitch,
			this.roll,
			this.yaw
		);
}