define(["require", 'go/GameObject'], function(){
	function Building(earth){
		this.initialize();
		
		this.earth = earth;
		
		var graphics = new Graphics();
		graphics.setStrokeStyle(1);
		graphics.beginFill(Graphics.getRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)));
		this.height = 200;//50+Math.random()*200;
		this.width = 50;//50+Math.random()*200;
		graphics.drawRect(0, 0, this.width, -this.height);
		graphics.endFill();

		this.shape = new Shape(graphics);
		this.addChild(this.shape);
		this.shape.alpha = 0.5;
		
		this.velocity = new Vector2D();
		this.gravity = new Vector2D();

		this.radian = 0;

		this.regX = this.width/2;
	}
	var p = Building.prototype = new GameObject;
	

	p.GameObject_initialize = p.initialize;
	p.initialize = function(){
		this.GameObject_initialize();
		
		this.wx = 0;
		this.wy = 0;

		this.inPosition = false;
	}

	p.destroy = function(){
		console.log(this.toString() + " destroyed");
	}

	p.GameObject_update = p.update;
	p.update = function(){
		this.GameObject_update();
		
		// update gravity
		var dx = this.x + this.velocity.x - this.earth.x;
		var dy = this.y + this.velocity.y - this.earth.y;
		if(dx*dx + dy*dy <= this.earth.radius*this.earth.radius){
			this.wx = Math.cos(this.radian)*this.earth.radius;
			this.wy = Math.sin(this.radian)*this.earth.radius;
		}
		else{
			this.gravity.x = -this.x;
			this.gravity.y = this.earth.radius - this.y;
			this.gravity.len = 0.98;

			// update velocity
			this.velocity.add(this.gravity);

			this.wx = Math.cos(this.radian)*this.earth.radius;
			this.wy = Math.sin(this.radian)*this.earth.radius;
		}

		// update radian
		this.radian += this.earth.rotateDelta;
	}

	p.toString = function(){
		return "[Building " + this.name + ", " + this.x + "," + this.y + "," + this.width + "," + this.height + "]"
	}
	
	window.Building = Building;
});