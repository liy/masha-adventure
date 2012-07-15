(function(window){
	function AABB(){
		this.lowerBound = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		this.upperBound = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

		// These 2 variables are used for caching the lower and upper bounds for merging with the parent DisplayObject's AABB and matrix. Only when this AABB is dirty,
		// or these two variables are null, they will be re-computed.
		//
		// Whenever thi
		this.lowerBoundForMerge = this.lowerBound;
		this.upperBoundForMerge = this.upperBound;

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

		return this;
	};

	/*
	Merge*/
	p.merge = function(child, matrix){
		// If the DisplayObject's matrix is changed, or DisplayObject's children's matrix has changed. In either of the two situation,
		// the Container's AABB will be set to dirty and the cache must be re-computed. That is to say, we only need to check whether
		// Container AABB is dirty or not to decide to update the cache.
		if(this.isDirty){
			cacheBoundsForMerge(child, matrix);
		}

		// We only need to compare the cached bounds with the Container's corresponding bounds to calculate the new bounds.
		this.lowerBound = Vec2.min(this.lowerBound, child.lowerBoundForMerge);
		this.upperBound = Vec2.max(this.upperBound, child.upperBoundForMerge);

		// The vertices will be updated to match with the upper and lower bounds. Then, if the DisplayObject's Container can
		// use the vertices information to compute its own AABB.
		this.vertices[0].setXY(this.lowerBound.x, this.lowerBound.y);
		this.vertices[1].setXY(this.lowerBound.x, this.upperBound.y);
		this.vertices[2].setXY(this.upperBound.x, this.upperBound.y);
		this.vertices[3].setXY(this.upperBound.x, this.lowerBound.y);
	};

	/*
	
	*/
	p.clone = function(){
		var aabb = new AABB();
		aabb.lowerBound = this.lowerBound.clone();
		aabb.upperBound = this.upperBound.clone();

		// update vertices.
		aabb.vertices[0] = this.vertices[0].clone();
		aabb.vertices[1] = this.vertices[1].clone();
		aabb.vertices[2] = this.vertices[2].clone();
		aabb.vertices[3] = this.vertices[3].clone();

		
		aabb.lowerBoundForMerge = this.lowerBoundForMerge.clone();
		aabb.upperBoundForMerge = this.upperBoundForMerge.clone();
		
		aabb.isDirty = this.isDirty;

		return aabb;
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

	/*
	Cache the lower and upper bounds for Container AABB merging purpose. As the parameters indicated, child AABB and its container's matrix. 
	Either of them are changed, the cache must be re-computed.
	*/
	function cacheBoundsForMerge(childAABB, matrix){
		var lowerBound = matrix.transformNew(childAABB.vertices[0]);
		var upperBound = lowerBound;

		for(var i=1; i<4; ++i){
			var v = matrix.transformNew(childAABB.vertices[i]);
			lowerBound = Vec2.min(lowerBound, v);
			upperBound = Vec2.max(upperBound, v);
		}
		childAABB.lowerBoundForMerge = lowerBound;
		childAABB.upperBoundForMerge = upperBound;


		// console.log(childAABB.x, childAABB.y);
	}

	window.AABB = AABB;
}(window));