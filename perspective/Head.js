function Head (canvas) {
	this.type = "MOUSE";

	this.calibrating = true;
	this.calibrated = {
		x: 0,
		y: 0,
		z: 0,
		t: 0
	}

	this.canvas = canvas;
	this.centerOfCanvas = {
		x: (this.canvas.offsetLeft + this.canvas.width) / 2,
		y: (this.canvas.offsetTop + this.canvas.height) / 2
	}
	this.sensitivity = 400;
}

Head.prototype.setCalibrating = function () {
	this.canvas.style.display = 'none';
}

Head.prototype.finishCalibrating = function () {
	this.calibrating = false;
	this.canvas.style.display = 'initial';
}

Head.prototype.trackHead = function (ready, update) {
	this.setCalibrating();

	var self = this;
	var Head = {

		update : function() {
			var head = xLabs.getConfig ("state.head");
			var x = head.x;
			var y = head.y;
			var z = head.z;

			if (self.isCalibrating()) 
				self.calibrate (x, y, z);
			else 
				self.headDidMove (x, y, z, update);
		},

		ready : function() {
			xLabs.setConfig( "system.mode", "head" );
			xLabs.setConfig( "browser.canvas.paintHeadPose", "0" );
			window.addEventListener( "beforeunload", function() {
				xLabs.setConfig( "system.mode", "off" );
			});

			ready();
		}

	};

	xLabs.setup( Head.ready, Head.update, null, "292ca114-6ea6-443d-a36e-b607dce1a312" );
}

Head.prototype.headDidMove = function (x, y, z, update) {

	var amountMoveX = this.calibrated.x - parseFloat(x);
	var amountMoveY = this.calibrated.y - parseFloat(y);
	var amountMoveZ = (parseFloat(z) - this.calibrated.z).toFixed(3);

	var _x = this.centerOfCanvas.x + amountMoveX * this.sensitivity;
	var _y = this.centerOfCanvas.y - amountMoveY * this.sensitivity;

	update(_x, _y, amountMoveZ);
}

Head.prototype.isCalibrating = function () {
	return this.calibrating;
}

Head.prototype.calibrate = function (x, y, z) {
	this.calibrated.x = this.calculateAvg(this.calibrated.x, this.calibrated.t, parseFloat(x));
	this.calibrated.y = this.calculateAvg(this.calibrated.y, this.calibrated.t, parseFloat(y));
	this.calibrated.z = this.calculateAvg(this.calibrated.z, this.calibrated.t, parseFloat(z));

	if (++this.calibrated.t > 20)
		this.finishCalibrating();
}

Head.prototype.calculateAvg = function (avg, n, x) {
	return (avg * n + x) / (n + 1);
}

Head.prototype.start = function (ready, update) {
	var self = this;

	if (this.type == "MOUSE")
		this.trackMouse (ready, update);
	else if (this.type == 'HEAD')
		this.trackHead (ready, update);
}

Head.prototype.trackMouse = function (ready, update) {
	document.onmousemove = function (e) {
		var x = e.pageX;
		var y = e.pageY;
		update(x,y,0);
	}
}