(function(window){
	/**
	 * Abstract class
	 */
	function GameObject(){
		// Some private variables, for easily manipulate the object, should be only used internally.
		// You will find the getter and setter to set these property.(It also affect the matrix as well)
		this._x = 0;
		this._y = 0;
		this._radian = 0;
		this._scaleX = 1;
		this._scaleY = 1;

		// 2d affine transform matrix, internal use only.
		this._m = new Mat3();

		// TODO: Axis-aligned bounding box, for speeding up the rendering and hit test
		this.aabb = new Rect();

		// The point representing the position of the GameObject
		this.anchorX = 0;
		this.anchorY = 0;
	}
	var p = GameObject.prototype;

	Object.defineProperty(p, "matrix", {
		get: function(){
			return this._m;
		},
		set: function(m){
			this._m = m;
		}
	})

	Object.defineProperty(p, "x", {
		get: function(){
			return this._x;
		},
		set: function(x){
			this._x = x;
			this._m.translate(this._x, this._y);
		}
	})

	Object.defineProperty(p, "y", {
		get: function(){
			return this._y;
		},
		set: function(y){
			this._y = y;
			this._m.translate(this._x, this._y);
		}
	})

	Object.defineProperty(p, "scaleX", {
		get: function(){
			return this._scaleX;
		},
		set: function(sx){
			this._scaleX = sx;
			this._m.scale(this._scaleX, this._scaleY);
		}
	})

	Object.defineProperty(p, "scaleY", {
		get: function(){
			return this._scaleY;
		},
		set: function(sy){
			this._scaleY = sy;
			this._m.scale(this._scaleY, this._scaleY);
		}
	})

	Object.defineProperty(p, "radian", {
		get: function(){
			return this._radian;
		},
		set: function(radian){
			this._radian = radian;
			this._m.rotate(radian);
		}
	})

	window.GameObject = GameObject;
}(window))