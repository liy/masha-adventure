(function(window){
	function Stage(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.klass = "Stage";
	}
	var p = Stage.prototype = new Container();

	p.draw = function(ctx){
		// reset to identity matrix transform
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		// clear the screen
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// reset identity
		this._m.identity();

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