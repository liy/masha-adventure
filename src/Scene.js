(function(window){	
	function Scene(){
		this.initialize();
		this.name = "scene";
		
		gameInput.addListener("keydown", bind(this, keyDownHandler));
		gameInput.addListener("keyup", bind(this, keyUpHandler));
		switches.addListener("switch press", bind(this, switchPressHandler));
		switches.addListener("switch release", bind(this, switchReleaseHandler));
	}
	var p = Scene.prototype = new Container();
	
	p.Container_initialize = p.initialize;
	p.initialize = function(){
		this.Container_initialize();
		
		this.buidingLayer = new BuildingLayer("New building layer");
		this.addChild(this.buidingLayer);

		this.player = new Player(AssetData.player);
		this.player.wy = 20;
		this.addChild(this.player);

		this.buildingGenerator = new BuildingGenerator();
		this.buildingGenerator.init(this.buidingLayer);
	} 
	
	p.update = function(){
		this.buidingLayer.update();
		this.player.update();
		camera.x = this.player.wx;
		camera.y = this.player.wy;

		this.buildingGenerator.generate();
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

	function switchPressHandler(e){
		this.player.velocity.x = 1;
		this.player.run(1);
	}

	function switchReleaseHandler(e){
		this.player.stopping();
	}
	
	window.Scene = Scene;
}(window))