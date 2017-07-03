function Head (canvas) {
	this.type = "HEAD";

	this.calibrating = true;
	this.calibrated = {
		point: new Point(0, 0),
		t: 0
	}

	this.canvas = canvas;
	this.centerOfCanvas = {
		x: (this.canvas.offsetLeft + this.canvas.width) / 2,
		y: (this.canvas.offsetTop + this.canvas.height) / 2
	}
	this.sensitivity = 400;
}

Head.prototype.start = function (ready, update) {
	var self = this;

	if (this.type == "MOUSE")
		this.trackMouse (ready, update);
	else if (this.type == 'HEAD')
		this.trackHead (ready, update);
}

///////////////////////////////////
///         TRACK HEAD          ///
///////////////////////////////////
Head.prototype.trackHead = function (ready, update) {

	this.startCalibrating();

	var self = this;
	var Head = {

		update : function() {
			var head = xLabs.getConfig ("state.head");
			delete head.features;
			var point = new Point(0,0);
			for (var key in head) {
				point[key] = parseFloat(head[key]);
			}

			if (self.isCalibrating()) 
				self.calibrate (point);
			else 
				self.headDidMove (point, update);
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

Head.prototype.headDidMove = function (point, update) {

	var amountMove = point.calibrate(this.calibrated.point);
	amountMove.z = (-(amountMove.z / 10)).toFixed(3);
	amountMove.x = this.centerOfCanvas.x + amountMove.x * this.sensitivity;
	amountMove.y = this.centerOfCanvas.y - amountMove.y * this.sensitivity;
	amountMove.yaw = amountMove.yaw * this.sensitivity / 5;
	amountMove.pitch = amountMove.pitch * this.sensitivity / 5;


	update(amountMove);
}

///////////////////////////////////
///         CALIBRATION         ///
///////////////////////////////////

Head.prototype.startCalibrating = function () {
	this.canvas.style.display = 'none';
}

Head.prototype.finishCalibrating = function () {
	this.calibrating = false;
	this.canvas.style.display = 'initial';
}

Head.prototype.isCalibrating = function () {
	return this.calibrating;
}

Head.prototype.calibrate = function (point) {

	for (var coord in this.calibrated.point) {
		this.calibrated.point[coord] = this.calculateAvg(this.calibrated.point[coord], this.calibrated.t, point[coord])
	}

	if (++this.calibrated.t > 20)
		this.finishCalibrating();
}

Head.prototype.calculateAvg = function (avg, n, x) {
	return (avg * n + x) / (n + 1);
}

///////////////////////////////////
///            MOUSE            ///
///////////////////////////////////

Head.prototype.trackMouse = function (ready, update) {
	document.onmousemove = function (e) {
		var x = e.pageX;
		var y = e.pageY;
		var point = new Point(x, y, 0);
		point.yaw = x/2;
		point.pitch = y/2;
		update(point);
	}
}