(function(window){
	function Stage(canvas){
		this.init();

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}
	var p = Stage.prototype = new Container();

	p.draw = function(){
		// reset to identity matrix transform
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		// clear the screen
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// reset identity
		this._m.identity();

		// transform according to camera matrix
		// this.context.transform(currentCamera.matrix.a, currentCamera.matrix.b, currentCamera.matrix.c, currentCamera.matrix.d, currentCamera.matrix.tx, currentCamera.matrix.ty);

		// d
		var len = this._children.length;
		for(var i=0; i<len; ++i){
			this._children[i].draw(this.context);
		}
	};


	p.clear = function(){
		this.context.save();
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.restore();
	};

	window.Stage = Stage;
}(window));