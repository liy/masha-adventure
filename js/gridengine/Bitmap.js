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

				this._aabb.setRect(this._rect);
			});
			this.image.src = src;
		}
		else{
			this.image = src;
			this._rect.width = this.image.width;
			this._rect.height = this.image.height;

			this._aabb.setRect(this._rect);
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
			// this._aabb.matrix.identity();
			// this._aabb.setRect(this._rect);
			// this._aabb.transform(this.matrix);
			this._aabb.isDirty = true;
			this._aabb.matrix.identity();
			this._aabb.matrix = this._aabb.matrix.multiplyLeft(this.matrix);
			// Since AABB instance just finished computing, it is set to be clean in order to reduce the computation cost.
			this._aabb.isDirty = false;

			return this._aabb.clone();
		}
	});

	/*
	Get an AABB in the targeted corodinate system
	*/
	p.getAABB = function(targetCoordinate){
		var aabb = new AABB();
		// identity matrix applied to the rectangle.
		aabb.setRect(this._rect);
		aabb.transform(new Mat3());
		var currentObj = this;
		while(currentObj != targetCoordinate){
			aabb.transform(currentObj.matrix);
			currentObj = currentObj.parent;
		}
		return aabb;
	};

	Object.defineProperty(p, "isOnStage", {
		get: function(){
			return this.stage != null;
		}
	});

	window.Bitmap = Bitmap;
}(window));