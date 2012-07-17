/*
Earth
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function Earth(){
		this.radius= 10;
	}
	var p = Earth.prototype = new DisplayObject();

	/*
	
	*/
	p.draw = function(ctx){
		if(!this.visible)
			return;

		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		// 2d affine transform
		ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);

		ctx.beginPath();
		// arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
		ctx.stroke();

		// pop the last saved matrix state, assign to the context.
		ctx.restore();
	};

	window.Earth = Earth;
}(window));