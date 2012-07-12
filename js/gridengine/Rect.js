(function(window){
	function Rect(x, y, width, height){
		if(x == null) 
			this.x = 0;
		else
			this.x = x;
		if(y == null)
			this.y = 0;
		else
			this.y = y;
		if(width == null)
			this.width = 0;
		else
			this.width = width;
		if(height == null)
			this.height = 0;
		else
			this.height = height;
	}
	var p = Rect.prototype;

	Object.defineProperty(p, 'size', {
		get: function(){
			return this.width*this.height;
		}
	});

	Object.defineProperty(p, "right", {
		get: function(){
			return this.x + this.width;
		}
	});

	Object.defineProperty(p, "left", {
		get: function(){
			return this.x;
		}
	});
	
	Object.defineProperty(p, "top", {
		get: function(){
			return this.y;
		}
	});

	Object.defineProperty(p, "bottom", {
		get: function(){
			return this.y + this.height;
		}
	});

	p.containsPoint = function(x, y, countForTouch){
		// console.log(this.toString() + " x: " + x + "  y: " + y);
		if(countForTouch==null || countForTouch)
			return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
		else
			return x > this.left && x < this.right && y > this.top && y < this.bottom;
	};

	/**
	* Whether the Camera contains the whole rectangle.
	*/
	p.containsRect = function(x, y, width, height, countForTouch){
		return this.containsPoint(x, y, countForTouch) && this.containsPoint(x+width, y+height, countForTouch);
	};

	/**
	* As long as a corner of the rectangle is in the camera, it is treated as hit by
	* the camera
	*/
	p.hitRect = function(x, y, width, height, countForTouch){
		return this.containsPoint(x, y, countForTouch) || this.containsPoint(x+width, y+height, countForTouch);
	};

	p.clone = function(){
		return new Rect(this.x, this.y, this.width, this.height);
	};

	p.toString = function(){
		return "[Rect (x="+this.x+", y="+this.y+", width="+this.width+", height="+this.height+")]";
	};
	window.Rect = Rect;
}(window));