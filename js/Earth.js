require(['require', 'http://code.createjs.com/easeljs-0.4.2.min.js', 'go/GameObject'], function(){

	function Earth(layer){
		this.initialize();
		this.layer = layer;
	}
	var p = Earth.prototype = new GameObject;

	p.GameObject_initialize = p.initialize;
	p.initialize = function(){
		this.GameObject_initialize();

		this.g = new Graphics();

		this.shape = new Shape(this.g);
		this.addChild(this.shape);

		this.radius = 800;
		this.pv = new Vector2D(this.radius, 0);
		this.rotateDelta = -0.3;
		this.radian = -(Math.PI - this.radianRange)/2;
	}

	p.rotate = function(){
		this.radian += this.rotateDelta;

		this.pv.zero();
		this.pv.len = this.radius;
		this.pv.rotate(this.radian);
		this.pv.y += this.radius;
	}

	p.GameObject_update = p.update;
	p.update = function(){
		this.GameObject_update();

		this.g.clear();

		this.rotate();
		
		this.g.setStrokeStyle(2)
		this.g.beginStroke(Graphics.getRGB(0,0,0));
		this.g.drawCircle(0, this.radius, this.radius);
		this.g.endFill();
	}

	window.Earth = Earth;
});