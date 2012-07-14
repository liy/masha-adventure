(function(window){
	function AABB(rect){
		this._matrix = new Mat3();

		this.lowerBound = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		this.upperBound = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

		// vertices contains un-transformed 4 points.
		this.vertices = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

		// update vertices, according to the parameter rect.
		this.setRect(rect);

		this.isDirty = true;
	}
	var p = AABB.prototype;

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

	/**
	Compute AABB according to the rectangle and the matrix transformation. If AABB instance is clean, it will
	NOT perform the computation.
	*/
	// p.transform = function(matrix){
	// 	this.matrix.multiplyLeft(matrix);
	// 	// TODO: Maybe put this check outside of this class, or even take this.isDirty out of this class?
	// 	if(this.isDirty){
	// 		var lowerBound = this.matrix.transform(this.vertices[0]);
	// 		var upperBound = lowerBound;

	// 		for(var i=1; i<4; ++i){
	// 			var v = this.matrix.transform(this.vertices[i]);
	// 			lowerBound = Vec2.min(lowerBound, v);
	// 			upperBound = Vec2.max(upperBound, v);
	// 		}
	// 		this.lowerBound = lowerBound;
	// 		this.upperBound = upperBound;
	// 	}

	// 	return this;
	// };

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "matrix", {
		get: function(){
			return this._matrix;
		},
		set: function(matrix){
			this._matrix = matrix;

			var lowerBound = this._matrix.transform(this.vertices[0]);
			var upperBound = lowerBound;

			for(var i=1; i<4; ++i){
				var v = this._matrix.transform(this.vertices[i]);
				lowerBound = Vec2.min(lowerBound, v);
				upperBound = Vec2.max(upperBound, v);
			}
			this.lowerBound = lowerBound;
			this.upperBound = upperBound;
		}
	});

	/*
	Merge 2 AABBs into a new AABB
	*/
	AABB.merge = function(aabb1, aabb2){
		var aabb3 = aabb1.clone();
		return aabb3.merge(aabb2);
	};

	/*
	Merge and update this AABB instance with the specified AABB, and return this instance.
	*/
	p.merge = function(aabb){
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
		var aabb = new AABB();

		aabb.lowerBound = this.lowerBound.clone();
		aabb.upperBound = this.upperBound.clone();

		aabb.vertices[0].setXY(this.vertices[0].x, this.vertices[0].y);
		aabb.vertices[1].setXY(this.vertices[1].x, this.vertices[1].y);
		aabb.vertices[2].setXY(this.vertices[2].x, this.vertices[2].y);
		aabb.vertices[3].setXY(this.vertices[3].x, this.vertices[3].y);

		aabb.matrix = this.matrix;

		return aabb;
	};

	window.AABB = AABB;
}(window));