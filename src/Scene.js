(function(window){	
	function Scene(){
		this.initialize();
		this.name = "scene";
		
		gameInput.addListener("keydown", bind(this, keyDownHandler));
		gameInput.addListener("keyup", bind(this, keyUpHandler));
	}
	var p = Scene.prototype = new Container;
	
	p.super_initialize = p.initialize;
	
	p.initialize = function(){
		this.super_initialize();
		
		console.log(AssetData.player);
		
		this.player = new Player(AssetData.player);
		this.player.x = 100;
		this.player.y = 100;
		this.addChild(this.player);
	} 
	
	p.update = function(){
		this.player.x += this.player.velocity.x;
		this.player.y += this.player.velocity.y;
		this.player.roundup();

		if(this.player.x + this.player.width < 0){
			this.player.x = adventure.stage.canvas.width;
		}
		else if(this.player.x > adventure.stage.canvas.width){
			this.player.x = -this.player.width;
		}

		if(this.player.y < 0){
			this.player.y = adventure.stage.canvas.height + this.player.height;
		}
		else if(this.player.y - this.player.height > adventure.stage.canvas.height){
			this.player.y = 0;
		}
	}
	
	function keyDownHandler(e){
		if(e.keyCode == 37){
			this.player.velocity.x = -1;
			this.player.run(-1);
		}
		else if(e.keyCode == 39){
			this.player.velocity.x = 1;
			this.player.run(1);
		}
		
		if(e.keyCode == 38){
			this.player.velocity.y = -1;
			this.player.run(0);
		}
		else if(e.keyCode == 40){
			this.player.velocity.y = 1;
			this.player.run(0);
		}
	}
	
	function keyUpHandler(e){
		this.player.stopping();
	}
	
	window.Scene = Scene;
}(window))