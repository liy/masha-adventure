define(['require', 'http://code.createjs.com/easeljs-0.4.2.min.js', 'GameInput', 'data/animations', 'go/Player', 'Earth'], function(){
	function Scene(){
		this.initialize();
		this.name = "scene";

		gameInput.addListener("keydown", bind(this, keyDownHandler));
		gameInput.addListener("keyup", bind(this, keyUpHandler));
		switches.addListener("switch press", bind(this, switchPressHandler));
		switches.addListener("switch release", bind(this, switchReleaseHandler));

		this.earth = new Earth();
		this.addChild(this.earth);
	}
	var p = Scene.prototype = new Container();
	
	p.Container_initialize = p.initialize;
	p.initialize = function(){
		this.Container_initialize();
	} 
	
	p.update = function(){
		this.earth.update();
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
		// this.player.stopping();
	}

	function switchPressHandler(e){
		// this.player.velocity.x = 1;
		// this.player.run(1);
	}

	function switchReleaseHandler(e){
		// this.player.stopping();
	}
	
	window.Scene = Scene;
})