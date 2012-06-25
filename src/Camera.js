(function(window){
	var scaleX = 1;
	var scaleY = 1;
	var oWidth = 1;
	var oHeight = 1;
	function Camera(){
	}
	var p = Camera.prototype;
	
	p.init = function(w, h, anchorRatioX, anchorRatioY){
		oWidth = this.currentWidth = w;
		oHeight = this.currentHeight = h;
		
		this.rotation = 0;
		
		this.position = new Vector2D();
		this.anchorRatio = new Vector2D(anchorRatioX, anchorRatioY);
		
		this.matrix = Matrix2D.identity.clone();
		console.log(this.matrix);
	}
	
	p.resize = function(w, h){
		this.currentWidth = w;
		this.currentHeight = h;
		
		scaleX = oWidth/w;
		scaleY = oHeight/h;
	}
	
	p.transform = function(go){
		go.x = go.wx - this.position.x + this.currentWidth * this.anchorRatio.x
		go.y = go.wy - this.position.y + this.currentHeight * this.anchorRatio.y
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
	
	window.Camera = Camera;
	
}(window));