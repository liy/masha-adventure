(function(window){
	function Scene(){
		this.initialize();
		this.name = "scene";
		
		gameInput.addListener("keydown", bind(this, keyDownHandler));
	}
	var p = Scene.prototype = new Container;
	
	p.super_initialize = p.initialize;
	
	p.initialize = function(){
		this.super_initialize();
		
		this.player = new Player();
		this.addChild(this.player);
	}
	
	p.update = function(){
		this.player.x += this.player.velocity.x;
		this.player.y += this.player.velocity.y;
		
		if(this.player.x + this.player.bitmap.image.width < 0){
			this.player.x = adventure.stage.canvas.width;
		}
		else if(this.player.x > adventure.stage.canvas.width){
			this.player.x = -this.player.bitmap.image.width;
		}
		
		if(this.player.y + this.player.bitmap.image.height < 0){
			this.player.y = adventure.stage.canvas.height;
		}
		else if(this.player.y > adventure.stage.canvas.height){
			this.player.y = -this.player.bitmap.image.height;
		}
	}
	
	function keyDownHandler(e){
		if(e.keyCode == 37)
			this.player.velocity.x -= 1;
		else if(e.keyCode == 39)
			this.player.velocity.x += 1;
		
		if(e.keyCode == 38)
			this.player.velocity.y -= 1;
		else if(e.keyCode == 40)
			this.player.velocity.y += 1;
	}
	
	window.Scene = Scene;
}(window))