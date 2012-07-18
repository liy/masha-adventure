(function(window){
	function Bitmap(src){
		this.init(src);
	}
	var p = Bitmap.prototype = new DisplayObject();

	p.DisplayObject_init = p.init;
	p.init = function(src){
		this.DisplayObject_init();

		// the rectangle object define the area of the object, e.g., the image width and height
		this._rect = new Rect();

		if(typeof src == 'string'){
			this.image = new Image();
			this.image.onload = bind(this, function(){
				this._rect.width = this.image.width;
				this._rect.height = this.image.height;

				this._aabb.reset(this._rect);

				this.dispatchEvent(new Event(Event.COMPLETE));
			});
			this.image.src = src;
		}
		else{
			this.image = src;
			this._rect.width = this.image.width;
			this._rect.height = this.image.height;

			this._aabb.reset(this._rect);
		}
	};

	/*
	Draw the Bitmap onto Canvas2D context.
	*/
	p.draw = function(ctx){
		if(!this.visible)
			return;

		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		
		ctx.globalAlpha *= this.alpha;

		// 2d affine transform
		ctx.transform(this._m.a,  this._m.b, this._m.c, this._m.d, this._m.tx+0.5|0, this._m.ty+0.5|0);
		// ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);
		// ctx.drawImage(this.image, this._rect.x, this._rect.y, this._rect.width, this._rect.height, 0, 0, this._rect.width, this._rect.height);
		ctx.drawImage(this.image, 0, 0);

		// pop the last saved matrix state, assign to the context.
		ctx.restore();
	};

	/*
	Calculate and return the AABB of the Bitmap instance.
	*/
	Object.defineProperty(p, "aabb", {
		get: function(){
			if(this._aabb.isDirty){
				this._aabb.reset(this._rect);
				// compute AABB, according to the matrix of the this Bitmap instance.
				this._aabb.transform(this.matrix);

				this.dirtyAABB = false;

				if(this.name == "bmp")
					console.log("perform Bitmap AABB transform");
			}
			// return the clone of the aabb.
			return this._aabb;
		}
	});

	window.Bitmap = Bitmap;
}(window));