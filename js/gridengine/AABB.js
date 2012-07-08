(function(window){
	function AABB(lowerBound, upperBound){
		if(lowerBound == null)
			this.lowerBound = new Vec2();
		else
			this.lowerBound = lowerBound;

		if(upperBound == null)
			this.upperBound = new Vec2();
		else
			this.upperBound = upperBound;

		// convinient Rectangle object for public access, you should not modify the rect object.
		this.rect = new Rect();
		updateRect(this);
	}
	var p = AABB.prototype;

	/**
	 * comput AABB
	 */
	p.compute = function(rect, m){
		// ccw vertices arrangement
		// 0------3
		// |      |
		// 1------2
		var vertices = [];
		vertices[0] = m.transform(new Vec2(rect.x, rect.y));
		vertices[1] = m.transform(new Vec2(rect.left, rect.bottom));
		vertices[2] = m.transform(new Vec2(rect.right, rect.bottom));
		vertices[3] = m.transform(new Vec2(rect.right, rect.top));

		var lowerBound = vertices[0];
		var upperBound = lowerBound;

		for(var i=0; i<4; ++i){
			lowerBound = Vec2.min(lowerBound, vertices[i]);
			upperBound = Vec2.max(upperBound, vertices[i]);
		}
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;

		updateRect(this);
	}

	p.merge = function(aabb){
		this.lowerBound = Vec2.min(this.lowerBound, aabb.lowerBound);
		this.upperBound = Vec2.max(this.upperBound, aabb.upperBound);

		updateRect(this);
	}

	function updateRect(scope){
		scope.rect.x = scope.lowerBound.x;
		scope.rect.y = scope.lowerBound.y;
		scope.rect.width = scope.upperBound.x-scope.lowerBound.x;
		scope.rect.height = scope.upperBound.y-scope.lowerBound.y;
	}


	// // centre of the AABB
	// Vec2<T> GetCentre() const{
	// 	return (lowerBound + upperBound) * 0.5f;
	// }

	// // half extent of the AABB
	// Vec2<T> GetExtents() const{
	// 	return (upperBound - lowerBound) * 0.5f;
	// }

	// // Combine two AABB into one.
	// void Combine(const acAABB2<T>& aabb1, const acAABB2<T>& aabb2){
	// 	lowerBound = acMin(aabb1.lowerBound, aabb2.lowerBound);
	// 	upperBound = acMax(aabb1.upperBound, aabb2.upperBound);
	// }

	// // Whether the AABB is contained in this
	// bool Contains(const acAABB2<T>& aabb) const{
	// 	return lowerBound.x <= aabb.lowerBound.x && lowerBound.y <= aabb.lowerBound.y &&
	// 		upperBound.x >= aabb.upperBound.x && upperBound.y >= aabb.upperBound.y;
	// }

	// // Contains the point vector?
	// // countForTouch is true, then the point on the edge will still be recognized as contained inside.
	// bool Contains(const Vec2<T> v, bool countForTouch) const{
	// 	if(countForTouch){
	// 		return lowerBound.x <= v.x && lowerBound.y <= v.y && upperBound.x >= v.x && upperBound.y >= v.y;
	// 	}
	// 	else{
	// 		return lowerBound.x < v.x && lowerBound.y < v.y && upperBound.x > v.x && upperBound.y > v.y;
	// 	}
	// }

	window.AABB = AABB;
}(window))