(function(window){
	function Building(){
		this.initialize();
		
		var g = new Graphics();
		g.setStrokeStyle(1);
		g.beginFill(Graphics.getRGB(Math.random()*255, Math.random()*255, Math.random()*255));
		this.height = 50+Math.random()*200;
		this.width = 50+Math.random()*200;
		g.drawRect(0, 0, this.width, -this.height);
		this.shape = new Shape(g);
		this.addChild(this.shape);
		this.shape.alpha = 0.5;
		this.velocity = new Vector2D(0,0);
		this.g = new Vector2D(0, 2);
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
		
		if(this.wy + this.velocity.y >= this.ty){
			this.wy = this.ty;
			this.inPosition = true;
		}
		else{
			this.wy += this.velocity.y;
			this.inPosition = false;
		}
		this.velocity.add(this.g);
	}

	p.toString = function(){
		return "[Building " + this.name + ", " + this.x + "," + this.y + "," + this.width + "," + this.height + "]"
	}
	
	window.Building = Building;
}(window));