(function(window){
	function Building(){
		this.initialize();
		
		var g = new Graphics();
		g.setStrokeStyle(1);
		g.beginFill(Graphics.getRGB(100, 100, 100));
		g.drawRect(0, 0, 50, 100);
		this.shape = new Shape(g);
		this.addChild(this.shape);
	}
	var p = Building.prototype = new GameObject;
	
	p.GameObject_update = p.update;
	p.update = function(){
		this.GameObject_update();
		// console.log(this.x + " " + this.y);
		// console.log(camera.x + " " + camera.y);
	}
	
	window.Building = Building;
}(window));