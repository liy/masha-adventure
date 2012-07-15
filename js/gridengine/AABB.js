(function(window){
	function AABB(){
		this.lowerBound = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		this.upperBound = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

		// Cache the lower and upper bounds transformed the parent container's matrix.
		this.transformedLowerBound = null;
		this.transformedUpperBound = null;

		// transformed vertices
		this.vertices = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

		this.isDirty = true;
	}
	var p = AABB.prototype;

	/*
	
	*/
	p.reset = function(rect){
		if(rect == null){
			this.vertices[0].zero();
			this.vertices[1].zero();
			this.vertices[2].zero();
			this.vertices[3].zero();

			this.lowerBound = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
			this.upperBound = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
		}
		else{
			// ccw vertices arrangement
			// 0------3
			// |      |
			// 1------2
			this.vertices[0].setXY(rect.x, rect.y);
			this.vertices[1].setXY(rect.left, rect.bottom);
			this.vertices[2].setXY(rect.right, rect.bottom);
			this.vertices[3].setXY(rect.right, rect.top);

			this.lowerBound = this.vertices[0];
			this.upperBound = this.vertices[2];
		}

		// clear parent matrix transform cache
		this.transformedLowerBound = null;
		this.transformedUpperBound = null;

		this.isDirty = true;
	};

	/*
	
	*/
	p.transform = function(matrix){
		var lowerBound = matrix.transform(this.vertices[0]);
		var upperBound = lowerBound;

		for(var i=1; i<4; ++i){
			var v = matrix.transform(this.vertices[i]);
			lowerBound = Vec2.min(lowerBound, v);
			upperBound = Vec2.max(upperBound, v);
		}
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;

		// clear parent matrix transform cache
		this.transformedLowerBound = null;
		this.transformedUpperBound = null;

		return this;
	};



	function mergeTransform(scope, matrix){
		var lowerBound = matrix.transformNew(scope.vertices[0]);
		var upperBound = lowerBound;

		for(var i=1; i<4; ++i){
			var v = matrix.transformNew(scope.vertices[i]);
			lowerBound = Vec2.min(lowerBound, v);
			upperBound = Vec2.max(upperBound, v);
		}
		scope.transformedLowerBound = lowerBound;
		scope.transformedUpperBound = upperBound;
	}

	p.merge = function(aabb, matrix){
		// If there is not cached version of the transformed lower and upper bounds, we need to recompute them.
		if(aabb.transformedLowerBound == null){
			mergeTransform(aabb, matrix);
		}

		this.lowerBound = Vec2.min(this.lowerBound, aabb.transformedLowerBound);
		this.upperBound = Vec2.max(this.upperBound, aabb.transformedUpperBound);

		this.vertices[0].setXY(this.lowerBound.x, this.lowerBound.y);
		this.vertices[1].setXY(this.lowerBound.x, this.upperBound.y);
		this.vertices[2].setXY(this.upperBound.x, this.upperBound.y);
		this.vertices[3].setXY(this.upperBound.x, this.lowerBound.y);
	};

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

	window.AABB = AABB;
}(window));