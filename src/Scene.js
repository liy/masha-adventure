(function(window){	
	function Scene(){
		this.initialize();
		this.name = "scene";
		
		gameInput.addListener("keydown", bind(this, keyDownHandler));
		gameInput.addListener("keyup", bind(this, keyUpHandler));
	}
	var p = Scene.prototype = new Container();
	
	p.Container_initialize = p.initialize;
	p.initialize = function(){
		this.Container_initialize();
		
		this.player = new Player(AssetData.player);
		this.addChild(this.player);
		
		var bl = new BuildingLayer("New building layer");
		this.addChild(bl);
		
		this.building = new Building();
		this.building.wx = 100;
		this.building.wy = 100;
		bl.addChild(this.building);
	} 
	
	p.update = function(){
		this.player.update();
		this.building.update();
		camera.x = this.player.wx;
		camera.y = this.player.wy;
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