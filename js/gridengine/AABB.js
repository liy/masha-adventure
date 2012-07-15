(function(window){
	function AABB(){
		this.lowerBound = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		this.upperBound = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

		// Just utils vertices contains un-transformed 4 points.
		this.vertices = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

		this.isDirty = true;
	}
	var p = AABB.prototype;

	p.reset = function(){
		this.lowerBound.x = Number.POSITIVE_INFINITY;
		this.lowerBound.y = Number.POSITIVE_INFINITY;
		this.upperBound.x = Number.NEGATIVE_INFINITY;
		this.upperBound.y = Number.NEGATIVE_INFINITY;

		this.isDirty = true;
	}

	Object.defineProperty(p, 'x', {
		get: function(){
			return this.lowerBound.x;
		}
	});

	Object.defineProperty(p, 'y', {
		get: function(){
			return this.lowerBound.y;
		}
	});

	Object.defineProperty(p, 'width', {
		get: function(){
			return this.upperBound.x - this.lowerBound.x;
		}
	});

	Object.defineProperty(p, 'height', {
		get: function(){
			return this.upperBound.y - this.lowerBound.y;
		}
	});

	p.transform = function(matrix){
		if(this.isDirty){
			var lowerBound = matrix.transform(this.vertices[0]);
			var upperBound = lowerBound;

			for(var i=1; i<4; ++i){
				var v = matrix.transform(this.vertices[i]);
				lowerBound = Vec2.min(lowerBound, v);
				upperBound = Vec2.max(upperBound, v);
			}
			this.lowerBound = lowerBound;
			this.upperBound = upperBound;

			// console.log("update performed");

			this.isDirty = false;
		}
	};

	p.setRect = function(rect){
		if(rect == null)
			rect = new Rect();
		// ccw vertices arrangement
		// 0------3
		// |      |
		// 1------2
		this.vertices[0].setXY(rect.x, rect.y);
		this.vertices[1].setXY(rect.left, rect.bottom);
		this.vertices[2].setXY(rect.right, rect.bottom);
		this.vertices[3].setXY(rect.right, rect.top);
	};

	/*
	Merge and update this AABB instance with the specified AABB, and return this instance.
	*/
	p.merge = function(aabb, matrix){
		var lowerBound = matrix.transform(aabb.vertices[0]);
		var upperBound = lowerBound;

		for(var i=1; i<4; ++i){
			var v = matrix.transform(aabb.vertices[i]);
			lowerBound = Vec2.min(lowerBound, v);
			upperBound = Vec2.max(upperBound, v);

			console.log(v.toString());
		}

		this.lowerBound = Vec2.min(this.lowerBound, aabb.lowerBound);
		this.upperBound = Vec2.max(this.upperBound, aabb.upperBound);

		// ccw vertices arrangement
		// 0------3
		// |      |
		// 1------2		
		// since the merged AABB has no vertices assigned, we assume its vertices are 4 corners defined by lower and upper bounds
		this.vertices[0].setXY(this.lowerBound.x, this.lowerBound.y);
		this.vertices[1].setXY(this.lowerBound.x, this.upperBound.y);
		this.vertices[2].setXY(this.upperBound.x, this.upperBound.y);
		this.vertices[3].setXY(this.upperBound.x, this.lowerBound.y);	

		return this;
	};

	/*
	Generate a Rect instance from this AABB
	*/
	p.generateRect = function(){
		return new Rect(this.lowerBound.x, this.lowerBound.y, this.upperBound.x-this.lowerBound.x, this.upperBound.y-this.lowerBound.y);
	};

	
	/*
	Clone this AABB
	*/
	p.clone = function(){
		var aabb = new AABB(this.displayObject);

		aabb.lowerBound = this.lowerBound.clone();
		aabb.upperBound = this.upperBound.clone();

		aabb.vertices[0].setXY(this.vertices[0].x, this.vertices[0].y);
		aabb.vertices[1].setXY(this.vertices[1].x, this.vertices[1].y);
		aabb.vertices[2].setXY(this.vertices[2].x, this.vertices[2].y);
		aabb.vertices[3].setXY(this.vertices[3].x, this.vertices[3].y);

		return aabb;
	};


	window.AABB = AABB;
}(window));