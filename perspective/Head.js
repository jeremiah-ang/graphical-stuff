function Head () {
	
}

Head.prototype.start = function (ready, update) {
	var self = this;
	document.onmousemove = function (e) {
		var x = e.pageX;
		var y = e.pageY;

		update(x,y);
	}
	// var Head = {

	// 	update : function() {
	// 		var head = xLabs.getConfig ("state.head");
	// 		var x = head.x;
	// 		var y = head.y;

	// 		update(xLabs.scr2docX(x), xLabs.scr2docY(y));
	// 	},

	// 	ready : function() {
	// 		xLabs.setConfig( "system.mode", "head" );
	// 		xLabs.setConfig( "browser.canvas.paintHeadPose", "1" );
	// 		window.addEventListener( "beforeunload", function() {
	// 			xLabs.setConfig( "system.mode", "off" );
	// 		});

	// 		ready();
	// 	}

	// };

	// xLabs.setup( Head.ready, Head.update, null, "292ca114-6ea6-443d-a36e-b607dce1a312" );
}