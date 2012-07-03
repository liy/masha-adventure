(function(window){
	function Vector2D(x, y){
		this.x = x || 0;
		this.y = y || 0;
	};
	var p = Vector2D.prototype;
	
	p.add = function(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	
	p.sub = function(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	
	p.scale = function(scale){
		this.x *= scale;
		this.y *= scale;
		return this;
	}
	
	p.dot = function(v){
		return this.x*v.x + this.y*v.y;
	}
	
	p.cross = function(v){
		return this.x*v.y - this.y*v.x;
	}
	
	/**
	 * Rotate this vector by an angle.
	 * If you want to rotate to a specifc angle use setAngle instead.
	 * <p>
	 * <code>
	 * finalRadian = currentRadian + $radian ----> fr = cr + r</br>
	 * nx = scale&#42;cos(cr+r) ----> nx = scale&#42;cos(cr)&#42;cos(r) - scale&#42;sin(cr)&#42;sin(r)</br>
	 * ny = scale&#42;sin(cr+r) ----> ny = scale&#42;sin(cr)&#42;cos(r) + scale&#42;cos(cr)&#42;sin(r)</br>
	 * x = scale&#42;cos(cr)</br>
	 * y = scale&#42;sin(cr)</br>
	 * SO:</br>
	 * nx = x&#42;cos(r) - y&#42;sin(r)
	 * ny = y&#42;cos(r) + x&#42;sin(r)
	 * </code>
	 * </p>
	 * @param $radian Angle in radian.
	 * 
	 */		
	p.rotate = function(radian){
		var cos = Math.cos(radian);
		var sin = Math.sin(radian);

		var nx = this.x*cos - this.y*sin;
		var ny = this.x*sin + this.y*cos;

		this.x = nx;
		this.y = ny;
	}
	
	/**
	 * Check a vector is perpendicular to this vector.
	 * If their dot product is 0 (Since cos(0) is 0), then they are
	 * perpendicular to each other.
	 * @param $v A Vector2D instance.
	 * @return True if they are perpendicular to each other.
	 * 
	 */		
	p.isPerpTo = function(v){
		return this.dot(v) == 0;
	}
	
	Object.defineProperty(p, "len", {
		/**
		 * Set the length of the vector. If current vector's length is 0.
		 * After length is set, the vector will be a[$length, 0], since we assume
		 * that the 0 length vector's angle is 0.
		 * @param $length The target length.
		 * 
		 */
		set: function(value){
			var len = this.len;
			if(len!=0){
				var scale = value/len;
				this.x = this.x*scale;
				this.y = this.y*scale;
			}
			else
				this.x = value;
		},
		get: function(){
			return Math.sqrt(this.x*this.x + this.y*this.y);
		}
	});

	Object.defineProperty(this, "len2", {
		get: function(){ return this.x*this.x + this.y*this.y; }
	});

	/**
	 * Set the vector length to 1/ 
	 * @return This vector
	 * 
	 */		
	p.normalize = function(){
		this.len = 1;
		return this;
	}

	/**
	 * 
	 * @param $v
	 * @return 
	 * 
	 */		
	p.equalTo = function(v){
		return this.x == v.x && this.y == v.y;
	}

	/**
	 * 
	 * @return 
	 * 
	 */		
	p.isZero = function(){
		return this.x == 0 && this.y == 0;
	}
	
	p.zero = function(){
		this.x = this.y = 0;
	}

	/**
	 * 
	 * @return 
	 * 
	 */		
	p.reverse = function(){
		this.x =- this.x;
		this.y =- this.y;
		return this;
	}

	/**
	 * 
	 * @return 
	 * 
	 */		
	p.clone = function(){
		return new Vector2D(this.x, this.y);
	}

	/**
	 * 
	 * @return 
	 * 
	 */		
	p.toString = function(){
		return "[x: " + this.x + ", y: " + this.y + "], length: " + this.len;
	}
	
	
	window.Vector2D = Vector2D;
}(window));