(function(window){
	function AABB(){
		
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
}(window))