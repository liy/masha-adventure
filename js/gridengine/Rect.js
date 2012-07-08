(function(window){
	function Rect(){
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}
	var p = Rect.prototype;

	Object.defineProperty(p, 'size', {
		get: function(){
			return this.width*this.height;
		}
	})

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
	}

	/**
	 * Whether the Camera contains the whole rectangle.
	 */
	p.containsRect = function(x, y, width, height, countForTouch){
		return this.containsPoint(x, y, countForTouch) && this.containsPoint(x+width, y+height, countForTouch);
	}

	/**
	 * As long as a corner of the rectangle is in the camera, it is treated as hit by
	 * the camera
	 */
	p.hitRect = function(x, y, width, height, countForTouch){
		return this.containsPoint(x, y, countForTouch) || this.containsPoint(x+width, y+height, countForTouch);
	}

	p.toString = function(){
		return "[Rect (x="+this.x+", y="+this.y+", width="+this.width+", height="+this.height+")]";
	}

	window.Rect = Rect;
}(window))