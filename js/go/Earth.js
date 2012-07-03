require(['require', 'http://code.createjs.com/easeljs-0.4.2.min.js', 'go/GameObject'], function(){

	function Earth(){
		this.initialize();
	}
	var p = Earth.prototype = new GameObject;

	p.GameObject_initialize = p.initialize;
	p.initialize = function(){
		this.GameObject_initialize();
		
		this.graphics = new Graphics();
		this.graphics.setStrokeStyle(2);
		this.graphics.beginStroke(Graphics.getRGB(0,0,0));
		this.graphics.beginFill(Graphics.getRGB(255,0,0));
		this.graphics.drawCircle(0,0,3);

		this.shape = new Shape(graphics);
		this.radian = 0;
		this.radius = 200;
	}

	p.super_update = p.update;
	p.update = function(){
		this.super_update();

		this.graphics
		
		this.roundup();
	}

});