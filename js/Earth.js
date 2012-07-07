define(['require', 'go/GameObject'], function(){
	function Earth(){
		this.initialize();

	 	// this.matrix = Matrix2D.identity.clone();

		this.radius = 800;
		this.x = 0;
		this.y = 0;

		this.graphics = new Graphics();
		this.graphics.setStrokeStyle(1);
		this.graphics.beginFill(Graphics.getRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)));
		this.height = 100;//50+Math.random()*200;
		this.width = 100;//50+Math.random()*200;
		this.graphics.drawRect(0, 0, this.width, this.height);
		this.graphics.endFill();

		this.graphics.setStrokeStyle(2);
	 	this.graphics.beginStroke(Graphics.getRGB(0, 0, 0));
	 	this.graphics.beginFill(Graphics.getRGB(255, 0, 0));
	 	this.graphics.drawCircle(0, 0, 5);

	 	this.shape = new Shape(this.graphics);
	 	this.addChild(this.shape);
	}
	var p = Earth.prototype = new GameObject();

	p.super_update = p.update;
	p.update = function(){
		// this.matrix.identity();
		// this.matrix.scale(2, 2);
	 // 	this.matrix.rotate(Math.PI/6);
	 // 	// this.matrix.translate(400, 300);
		// this.matrix.decompose(this);

		this.rotation += 10;

		this.super_update();
	}

	window.Earth = Earth;
});