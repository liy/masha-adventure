(function(window){

	/**
	 * Column major 3x3 matrix
	 * | a	 c   tx |
	 * | b   d   ty |
	 * | 0   0   1  |
	 */
	function Mat3(a, b, c, d, tx, ty){
		this.init(a, b, c, d, tx, ty);
	}
	var p = Mat3.prototype;

	// default identity matrix
	p.a =  p.d = 1;
	p.b = p.c = p.tx = p.ty = 0;

	p.init = function(a, b, c, d, tx, ty){
		if(a != null) this.a = a;
		if(b != null) this.b = b;
		if(c != null) this.c = c;
		if(d != null) this.d = d;
		if(tx != null) this.tx = tx;
		if(ty != null) this.ty = ty;
	};

	p.identity = function(){
		this.a =  this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;

		return this;
	};

	/**
	* | a1   c1   tx1 |       | a2   c2   tx2 |
	* | b1   d1   ty1 |   *   | b2   d2   ty2 |
	* | 0    0    1   |       | 0    0    1   |
	*/
	p.multiply = function(m){
		var a1 = this.a;
		var b1 = this.b;
		var c1 = this.c;
		var d1 = this.d;

		this.a = a1*m.a + c1*m.b;
		this.b = b1*m.a + d1*m.b;
		this.c = a1*m.c + c1*m.d;
		this.d = b1*m.c + d1*m.d;
		this.tx = a1*m.tx + c1*m.ty + this.tx;
		this.ty = b1*m.tx + d1*m.ty + this.ty;

		return this;
	};

	p.translate = function(dx, dy){
		this.tx += dx;
		this.ty += dy;

		return this;
	};

	/**
	* | sx    0     0 |       | a    c   tx |
	* | 0     sy    0 |   *   | b    d   ty |
	* | 0     0     1 |       | 0    0   1  |
	*/
	p.scale = function(sx, sy){
		this.a *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;

		return this;
	};

	/**
	* | cos   -sin   0 |       | a    c   tx |
	* | sin   cos    0 |   *   | b    d   ty |
	* | 0     0      1 |       | 0    0   1  |
	*/
	p.rotate = function(radian){
		var cos = Math.cos(radian);
		var sin = Math.sin(radian);

		var a = this.a;
		var c = this.c;
		var tx = this.tx;

		this.a = cos*a - sin*this.b;
		this.b = sin*a + cos*this.b;
		this.c = cos*c - sin*this.d;
		this.d = sin*c + cos*this.d;

		this.tx = cos*tx - sin*this.ty;
		this.ty = sin*tx + cos*this.ty;

		return this;
	};

	// TODO: polish the transform method, should it be in the Mat3 class or Vec2 class
	/**
	* transform the Vec2 instance.
    * | a    c    tx |       | x |
	* | b    d    ty |   *   | y |
	* | 0    0    1  |       | 1 |
	*/
	p.transform = function(v){
		var x = v.x;
		var y = v.y;
		v.x = this.a*x + this.c*y + this.tx;
		v.y = this.b*x + this.d*y + this.ty;

		return v;
	};

	p.clone = function(){
		return new Mat3(this.a, this.b, this.c, this.d, this.tx, this.ty);
	};

	p.toString = function(){
		return "[Mat3 (a="+this.a+", b="+this.b+", c="+this.c+", d="+this.d+", tx="+this.tx+", ty="+this.ty+")]";
	};





	/////////////////////////
	// copied from EaselJS
	/////////////////////////
	/////////////////////////
	/////////////////////////
	/////////////////////////


	p.invert = function() {
		var a1 = this.a;
		var b1 = this.b;
		var c1 = this.c;
		var d1 = this.d;
		var tx1 = this.tx;
		var n = a1*d1-b1*c1;

		this.a = d1/n;
		this.b = -b1/n;
		this.c = -c1/n;
		this.d = a1/n;
		this.tx = (c1*this.ty-d1*tx1)/n;
		this.ty = -(a1*this.ty-b1*tx1)/n;
		return this;
	};




	/**
	* Concatenates the specified matrix properties with this matrix. All parameters are required.
	* @method prepend
	* @param {Number} a
	* @param {Number} b
	* @param {Number} c
	* @param {Number} d
	* @param {Number} tx
	* @param {Number} ty
	* @return {Matrix2D} This matrix. Useful for chaining method calls.
	**/
	p.prepend = function(a, b, c, d, tx, ty) {
		var tx1 = this.tx;
		if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
			var a1 = this.a;
			var c1 = this.c;
			this.a  = a1*a+this.b*c;
			this.b  = a1*b+this.b*d;
			this.c  = c1*a+this.d*c;
			this.d  = c1*b+this.d*d;
		}
		this.tx = tx1*a+this.ty*c+tx;
		this.ty = tx1*b+this.ty*d+ty;
		return this;
	};

	/**
	* Appends the specified matrix properties with this matrix. All parameters are required.
	* @method append
	* @param {Number} a
	* @param {Number} b
	* @param {Number} c
	* @param {Number} d
	* @param {Number} tx
	* @param {Number} ty
	* @return {Matrix2D} This matrix. Useful for chaining method calls.
	**/
	p.append = function(a, b, c, d, tx, ty) {
		var a1 = this.a;
		var b1 = this.b;
		var c1 = this.c;
		var d1 = this.d;

		this.a  = a*a1+b*c1;
		this.b  = a*b1+b*d1;
		this.c  = c*a1+d*c1;
		this.d  = c*b1+d*d1;
		this.tx = tx*a1+ty*c1+this.tx;
		this.ty = tx*b1+ty*d1+this.ty;
		return this;
	};

	/**
	* Prepends the specified matrix with this matrix.
	* @method prependMatrix
	* @param {Matrix2D} matrix
	**/
	p.prependMatrix = function(matrix) {
		this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
		return this;
	};

	/**
	* Appends the specified matrix with this matrix.
	* @method appendMatrix
	* @param {Matrix2D} matrix
	* @return {Matrix2D} This matrix. Useful for chaining method calls.
	**/
	p.appendMatrix = function(matrix) {
		this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
		return this;
	};

	window.Mat3 = Mat3;
}(window));