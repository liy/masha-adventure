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
		
		this.gameLayer = new Layer("New building layer");
		this.addChild(this.gameLayer);
		
		// this.building = new Building();
		// this.gameLayer.addChild(this.building);

		this.buildingGenerator = new BuildingGenerator();
		this.buildingGenerator.init(this.gameLayer);



		// this.tx = 0;
		// for(var i=0; i<3; ++i){
		// 	var c = new Container();
		// 	var g = new Graphics();
		// 	g.setStrokeStyle(1);
		// 	g.beginFill(Graphics.getRGB(Math.random()*255, Math.random()*255, Math.random()*255));
		// 	c.height = 100+Math.random()*200;
		// 	c.width = 50+Math.random()*100
		// 	g.drawRect(0, 0, c.width, -c.height);
		// 	var shape = new Shape(g);
		// 	c.addChild(shape);
		// 	shape.alpha = 0.5;
		// 	c.x = this.tx;
		// 	c.y = 100;
		// 	this.tx += c.width + Math.random()*100;
		// 	this.addChild(c);		

		// 	console.log(this.tx);
		// }

		// this.tx = 0;
		// for(var i=0; i<3; ++i){
		// 	var b = new Building();
		// 	b.x = this.tx;
		// 	b.y = 100;
		// 	this.addChild(b);
		// 	this.tx += 100;
		// 	console.log(b);
		// }

	} 
	
	p.update = function(){
		this.gameLayer.update();
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
	
	window.Scene = Scene;
}(window))