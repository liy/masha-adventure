(function(window){
	function Camera(w, h, anchorRatioX, anchorRatioY){
		this._originalWidth = w;
		this._originalHeight = h;

		this._rotation = 0;
		this._scaleX = 1;
		this._scaleY = 1;

		this.anchorRatioX = anchorRatioX;
		this.anchorRatioY = anchorRatioY;

		// 2d affine transform matrix, internal use only.
		this._m = new Mat3();
		
		// TODO: change this to _x and _y?
		this.position = new Vec2();

		this.dirtyMatrix = true;

	}
	var p = Camera.prototype;
	
	p.containsPoint = function(x, y){
		return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
	};

	/**
	* Whether the Camera contains the whole rectangle.
	*/
	p.containsRect = function(x, y, width, height){
		return this.containsPoint(x, y) && this.containsPoint(x+width, y+height);
	};

	/**
	* As long as a corner of the rectangle is in the camera, it is treated as hit by
	* the camera
	*/
	p.hitRect = function(x, y, width, height){
		return this.containsPoint(x, y) || this.containsPoint(x+width, y+height);
	};
	
	p.resize = function(w, h){
		this._scaleX = w/this._originalWidth;
		this._scaleY = h/this._originalHeight;

		this.dirtyMatrix = true;
	};

	/*
	
	*/
	p.update = function(){
		if(this.dirtyMatrix){
			this._m.identity();

			// Notice that these convinient methods act like generating corresponding transform matrix.
			// The new matrix will be multiply to the current matrix:
			//		this._m = newMatrix * this._m.
			// Which means, the matrix gernerated by earlier methods will be applied first, the latter matrix will be applied later.
			// Therefore, the transform sequence shoud be:
			//		anchor translate  ->  scale  -> rotate  ->  position translate.
			this._m.translate(this.anchorRatioX * this.width, this.anchorRatioY * this.height);//anchor translation transform
			this._m.scale(1/this._scaleX, 1/this._scaleY);// scale transform
			this._m.rotate(-this._rotation);//rotation transform
			this._m.translate(-this.position.x, -this.position.y);//normal position translation transform

			// the matrix is clean, no need perform matrix construction again.
			this.dirtyMatrix = false;
		}
	};
	
	/*
	Getter and setter
	*/
	Object.defineProperty(p, "matrix", {
		get: function(){
			return this._m;
		},
		set: function(matrix){
			this._m = matrix.clone();

			/**
			* Naive decompose process.
			*
			*	We assume the matrix will only contains 2D affine transformation, and only an extra Z translation, for now, ignore the translation elements
			*		| cos(r)*scaleX    -sin(r)*skewX	0  |
			*		| sin(r)*skewY		cos(r)*scaleY	0  |
			*		| 0					0				1  |
			*
			*	If we apply this matrix to a point at (1.0f, 0.0f)
			*		x' = cos(r) * scaleX
			*		y' = sin(r) * skewY
			*
			*	The rotation then will be:
			*		atan2f(x', y')
			*	===>>
			*		_rotation = atan2f(_transform[1], _transform[0])
			*
			*
			*	Also the scale will be:
			*		scaleX = _transform[0] / cos(r)
			*		scaleY = _transform[5] / cos(r)
			*/
			this._rotation = Math.atan2(this._m.b, this._m.a) * Vec2.RADIAN_TO_DEGREE;

			var cos = Math.cos(this.radian);
			this._scaleX = this._m.a/cos;
			this._scaleY = this._m.d/cos;
			this.position.setXY(this._m.tx - this._anchorX, this._m.ty - this._anchorY);

			this.dirtyMatrix = true;
		}
	});

	Object.defineProperty(p, "x", {
		set: function(value){
			this.position.x = value;
			this.dirtyMatrix = true;
		},
		get: function(){
			return this.position.x;
		}
	});
	
	Object.defineProperty(p, "y", {
		set: function(value){
			this.position.y = value;
			this.dirtyMatrix = true;
		},
		get: function(){
			return this.position.y;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "width", {
		get: function(){
			return this._originalWidth * this._scaleX;
		},
		set: function(width){
			this._scaleX = width/this._originalWidth;
			this.dirtyMatrix = true;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "height", {
		get: function(){
			return this._originalHeight * this._scaleY;
		},
		set: function(height){
			this._scaley = height/this._originalHeight;
			this.dirtyMatrix = true;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "rotation", {
		get: function(){
			return this._rotation;
		},
		set: function(rotation){
			this._rotation = rotation;
			this.dirtyMatrix = true;
		}
	});

	Object.defineProperty(p, "right", {
		get: function(){
			return this.position.x + this.width * (1-this.anhorRatioX);
		}
	});

	Object.defineProperty(p, "left", {
		get: function(){
			return this.position.x - this.width * this.anhorRatioX;
		}
	});
	
	Object.defineProperty(p, "top", {
		get: function(){
			return this.position.y - this.height * this.anhorRatioY;
		}
	});

	Object.defineProperty(p, "bottom", {
		get: function(){
			return this.position.y + this.height * (1-this.anhorRatioY);
		}
	});

	window.Camera = Camera;
}(window));