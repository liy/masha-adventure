(function(window){
	function Scene(){
		this.initialize();
		this.name = "scene";
		
		document.addEventListener("keydown", bind(this, keyDownHandler), false);
		// document.addEventListener("keydown", keyDownHandler.bind(this), false);
	}
	var p = Scene.prototype = new Container;
	
	p.super_initialize = p.initialize;
	
	p.initialize = function(){
		this.super_initialize();
		
		this.player = new Player();
		this.addChild(this.player);
	}
	
	p.update = function(){
		this.player.x = 100;
		this.player.y = 100;
	}
	
	function keyDownHandler(e){
		if(e.keyCode == 37)
			this.player.x -= 20;
		else(e.keyCode == 39)
			this.player.x += 20;
	}
	
	window.Scene = Scene;
}(window))