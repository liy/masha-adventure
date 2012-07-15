(function(window){
	function Bitmap(src){
		this.init(src);
	}
	var p = Bitmap.prototype = new DisplayObject();

	p.super_init = p.init;
	p.init = function(src){
		this.super_init();

		// the rectangle object define the area of the object, e.g., the image width and height
		this._rect = new Rect();

		if(typeof src == 'string'){
			this.image = new Image();
			this.image.onload = bind(this, function(){
				this._rect.width = this.image.width;
				this._rect.height = this.image.height;

				this._aabb.reset(this._rect);
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

	p.draw = function(ctx){
		if(!this.visible)
			return;

		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		// 2d affine transform
		ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);
		// ctx.drawImage(this.image, this._rect.x, this._rect.y, this._rect.width, this._rect.height, 0, 0, this._rect.width, this._rect.height);
		ctx.drawImage(this.image, 0, 0);

		// pop the last saved matrix state, assign to the context.
		ctx.restore();
	};

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "aabb", {
		get: function(){
			if(this._aabb.isDirty){
				this._aabb.reset(this._rect);
				// compute AABB, according to the matrix of the this Bitmap instance.
				this._aabb.transform(this.matrix);
			}
			// return the clone of the aabb.
			return this._aabb;
		}
	});

	Object.defineProperty(p, "isOnStage", {
		get: function(){
			return this.stage != null;
		}
	});

	window.Bitmap = Bitmap;
}(window));