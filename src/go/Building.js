(function(window){
	function Building(){
		this.initialize();
		
		var g = new Graphics();
		g.setStrokeStyle(1);
		g.beginFill(Graphics.getRGB(Math.random()*255, Math.random()*255, Math.random()*255));
		this.height = 50+Math.random()*200;
		this.width = 50+Math.random()*200
		// this.width = 100;
		// this.height = 100;
		g.drawRect(0, 0, this.width, -this.height);
		this.shape = new Shape(g);
		this.addChild(this.shape);
		this.shape.alpha = 0.5;
	}
	var p = Building.prototype = new GameObject;
	

	p.GameObject_initialize = p.initialize;
	p.initialize = function(){
		this.GameObject_initialize();
		
		this.wx = 0;
		this.wy = 0;
	}


	p.GameObject_update = p.update;
	p.update = function(){
		this.GameObject_update();
		// console.log(this.x + " " + this.y);
		// console.log(camera.x + " " + camera.y);
	}
	
	window.Building = Building;
}(window));