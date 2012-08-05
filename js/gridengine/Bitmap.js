(function(window){
	function Bitmap(){
		this.init();
	}
	var p = Bitmap.prototype = new DisplayObject();

	p.DisplayObject_init = p.init;
	p.init = function(){
		this.DisplayObject_init();

		this.image = null;

		// the rectangle object define the area of the object, e.g., the image width and height
		this._rect = new Rect();
	};

	/*
	
	*/
	p.load = function(imageOrURL){
		// url
		if(typeof imageOrURL === 'string'){
			this.image = new Image();
			this.image.onload = bind(this, this.onload);
			this.image.src = imageOrURL;
		}
		else{
			this.image = imageOrURL;

			if(!this.image.complete)
				this.image.onload = bind(this, this.onload);
			else
				this.onload();
		}
	};

	/*
	
	*/
	p.onload = function(){
		console.log('bitmap loaded complete');
		this._rect.width = this.image.width;
		this._rect.height = this.image.height;

		this._aabb.reset(this._rect);

		this.dispatchEvent(new Event(Event.COMPLETE));
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

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "complete", {
		get: function(){
			return this.image.complete;
		}
	});

	window.Bitmap = Bitmap;
}(window));