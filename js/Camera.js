define(['require', 'math/Vector2D'], function(){
	var oWidth = 1;
	var oHeight = 1;
	var scaleX = 1;
	var scaleY = 1;

	function Camera(){
	}
	var p = Camera.prototype;
	
	p.init = function(w, h, anchorRatioX, anchorRatioY){
		this.matrix = Matrix2D.identity.clone();

		this.currentWidth = w;
		this.currentHeight = h;
		oWidth = w;
		oHeight = h;

		this.rotation = 0;
		
		this.position = new Vector2D();
		this.anchorRatio = new Vector2D(anchorRatioX, anchorRatioY);

		// in degree
		this.rotation = 0;
	}
	
	p.containsPoint = function(x, y){
		return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
	}

	/**
	 * Whether the Camera contains the whole rectangle.
	 */
	p.containsRect = function(x, y, width, height){
		return this.containsPoint(x, y) && this.containsPoint(x+width, y+height);
	}

	/**
	 * As long as a corner of the rectangle is in the camera, it is treated as hit by
	 * the camera
	 */
	p.hitRect = function(x, y, width, height){
		return this.containsPoint(x, y) || this.containsPoint(x+width, y+height);
	}
	
	// p.resize = function(w, h){
	// 	this.currentWidth = w;
	// 	this.currentHeight = h;
		
	// 	scaleX = oWidth/w;
	// 	scaleY = oHeight/h;
	// }
	
	p.transform = function(go){
		// TODO: simulate the perspective scrolling, update the x position using a 
		// scale, further GameObject has smaller scale.
		// go.x = go.wx - this.position.x + this.currentWidth * this.anchorRatio.x
		// go.y = go.wy - this.position.y + this.currentHeight * this.anchorRatio.y


		// TransMatrices::Instance()->modelView.Scale(scale, scale, 1.0f);
		// TransMatrices::Instance()->modelView.Translate(currentWidth * anchorRatio.x, currentHeight * anchorRatio.y, 0.0f);
		// TransMatrices::Instance()->modelView.RotateZ(rotation);
		// TransMatrices::Instance()->modelView.LookAt(position.x, position.y, 1.0f,
		// 	position.x, position.y, 0.0f,
		// 	0.0f, 1.0f, 0.0f);

		this.matrix.identity();
		this.matrix.rotate(-this.rotation);
		this.matrix.translate(this.currentWidth*this.anchorRatio.x - this.x, this.currentHeight*this.anchorRatio.y - this.y);
		this.matrix.scale(scaleX, scaleY);


		// console.log("go.getMatrix(): " + go.getConcatenatedMatrix());
		var matrix = new Matrix2D();
		matrix.appendMatrix(this.matrix);
		matrix.appendMatrix(go.getConcatenatedMatrix());
		// matrix.decompose(go);
	}
	
	Object.defineProperty(p, "x", {
		set: function(value){
			this.position.x = value;
		},
		get: function(){
			return this.position.x;
		}
	});
	
	Object.defineProperty(p, "y", {
		set: function(value){
			this.position.y = value;
		},
		get: function(){
			return this.position.y;
		}
	});

	Object.defineProperty(p, "right", {
		get: function(){
			return this.position.x + this.currentWidth * (1-this.anchorRatio.x);
		}
	});

	Object.defineProperty(p, "left", {
		get: function(){
			return this.position.x - this.currentWidth * this.anchorRatio.x;
		}
	});
	
	Object.defineProperty(p, "top", {
		get: function(){
			return this.position.y - this.currentHeight * this.anchorRatio.y;
		}
	});

	Object.defineProperty(p, "bottom", {
		get: function(){
			return this.position.y + this.currentHeight * (1-this.anchorRatio.y);
		}
	});

	window.Camera = Camera;
});