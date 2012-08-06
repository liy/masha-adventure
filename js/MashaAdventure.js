/**
 * Author: Zhengyi Li
 */

window.onload = function(){
	function MashaAdventure(){
		this.currentScene = null;
		this.goScene('game');

		this.mainloop();
	}
	var p = MashaAdventure.prototype;
	/*
	
	*/
	p.goScene = function(sceneName){
		if(this.currentScene != null)
			this.currentScene.fadeOut(1);

		switch(sceneName){
			case 'game':
				this.currentScene = new GameScene();
			break;
			case 'title':
				this.currentScene = new TitleScene();
			break;
		}

		stage.addChild(this.currentScene);
		this.currentScene.fadeIn(1);
	};

	p.mainloop = function() {
		stats.begin();
		
		if(this.currentScene != null)
			this.currentScene.update();

		requestAnimFrame(bind(this, this.mainloop));
		stage.draw();

		stats.end();
	};


	// root canvas
	this.rootCanvas = document.getElementById('root-canvas');

	// box2d scale
	this.SCALE = 30;
	// box2d shortcuts:
	this.b2Vec2 = Box2D.Common.Math.b2Vec2;
	this.b2BodyDef = Box2D.Dynamics.b2BodyDef;
	this.b2PolygonDef = Box2D.Dynamics.b2PolygonDef;
	this.b2CircleDef = Box2D.Dynamics.b2CircleDef;
	this.b2Body = Box2D.Dynamics.b2Body;
	this.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	this.b2Fixture = Box2D.Dynamics.b2Fixture;
	this.b2World = Box2D.Dynamics.b2World;
	this.b2MassData = Box2D.Collision.Shapes.b2MassData;
	this.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	this.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	this.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


	this.stats = new Stats();
	this.stats.setMode(0); // 0: fps, 1: ms
	// Align top-left
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.left = (rootCanvas.offsetLeft+rootCanvas.width)+"px";
	this.stats.domElement.style.top = rootCanvas.offsetTop + 'px';
	var rootDiv = document.getElementById('root-div');
	rootDiv.appendChild(this.stats.domElement);

	// init stage
	this.stage = new Stage(this.rootCanvas);
	this.stage.camera = new Camera(800, 600, 0.5, 0.8);
	this.adventure = new MashaAdventure();
};