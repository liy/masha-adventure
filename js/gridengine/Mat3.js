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
	}

	p.identity = function(){
		this.a =  this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;

		return this;
	}

	/**
 	 * | a1	  c1   tx1 |       | a2   c2   tx2 |
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
	}

	p.translate = function(dx, dy){
		this.tx += dx;
		this.ty += dy;

		return this;
	}

	/**
	 * | sx    0     0 |       | a	  c   tx |
	 * | 0     sy    0 |   *   | b    d   ty |
	 * | 0     0     1 |       | 0    0   1  |
	 */
	p.scale = function(sx, sy){
		this.a *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;

		return this;
	}

	/**
	 * | cos   -sin   0 |       | a	   c   tx |
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
	}

	p.toString = function(){
		return "[Mat3 (a="+this.a+", b="+this.b+", c="+this.c+", d="+this.d+", tx="+this.tx+", ty="+this.ty+")]";
	}

	window.Mat3 = Mat3;
}(window))