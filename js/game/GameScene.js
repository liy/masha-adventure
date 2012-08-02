/*
GameScene
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function GameScene(){
		this.init();

	}
	var p = GameScene.prototype = new Scene();

	p.Scene_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.Scene_init();

		this.toBeDestroyedGameObjects = [];

		this._gameObjects = [];

		this.buildingContainer = new Container();
		this.addChild(this.buildingContainer);
		this._buildingGenerator = new BuildingGenerator(this);

		window.world = new b2World(new b2Vec2(0, 25), true);

		// box2d debug draw
		this.debugDraw = new b2DebugDraw();
		this.debugDraw.SetSprite(rootCanvas.getContext('2d'));
		this.debugDraw.SetDrawScale(SCALE);
		this.debugDraw.SetFillAlpha(0.2);
		this.debugDraw.SetLineThickness(1.0);
		this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(this.debugDraw);

		// add contact mediator.
		// All the contact event will be mediated to the proper Fixture, if the fixture has the corresponding handler for
		// the contact event.
		contactMediator.init(world);

		this.paused = true;

		switches.addListener('switch press', bind(this, this.switchDownHandler));
		switches.addListener('switch release', bind(this, this.switchUpHandler));
		rootCanvas.addEventListener("mousedown", bind(this, this.mouseDownHandler), false);
		document.addEventListener("keydown", bind(this, this.keyDownHandler), false);
		document.addEventListener("keyup", bind(this, this.keyUpHandler), false);

		// ground
		var tx = 0;
		for(var i=0; i<100; ++i){
			var ground = new Ground();
			this.addGameObject(ground);
			ground.x = tx/SCALE;

			tx += ground.length;
		}

		this.player = new Player();
		this.addChild(this.player.animation);

		this.addGameObject(this.player);
	};

	/*
	
	*/
	p.addGameObject = function(go){
		this._gameObjects.push(go);
	};

	p.removeGameObject = function(go){
		for(var i=0; i<this._gameObjects.length; ++i){
			if(this._gameObjects[i] == go)
				delete this._gameObjects[i];
		}
	};

	/*
	
	*/
	p.update = function(){
		// advance the physics.
		world.Step(1/60, 10, 10);
		world.ClearForces();

		// update the animation.
		for(var i=0; i<this._gameObjects.length; ++i){
			if(this._gameObjects[i].update)
				this._gameObjects[i].update();
		}

		// camera follows player
		stage.camera.x = this.player.x;
		stage.camera.y = this.player.y;

		// generate new building
		this._buildingGenerator.process();
	};

	p.Scene_draw = p.draw;
	/*
	
	*/
	p.draw = function(ctx){
		// draw box2d debug graphcis.
		world.DrawDebugData();

		// draw all the graphics.
		this.Scene_draw(ctx);
	};

	/*
	
	*/
	p.switchDownHandler = function(){
		this.paused = false;

		this.player.jump();
	};

	/*
	
	*/
	p.switchUpHandler = function(){
		this.paused = true;

		this.player.stopJump();
	};

	/*
	
	*/
	p.keyDownHandler = function(evt){
		// console.log('key down');

		// testing vec
		var force = new b2Vec2();

		/*
		left arrow		37
		up arrow		38
		right arrow		39
		down arrow		40
		*/
		switch(evt.keyCode){
			case 37:
				this.player.moveState = Player.MOVE_LEFT;
			break;
			case 38:
				// force.y = -150;
			break;
			case 39:
				this.player.moveState = Player.MOVE_RIGHT;
			break;
			case 40:
				// force.y = 150;
			break;
		}
		this.player.force = force;
	};

	/*

	*/
	p.keyUpHandler = function(evt){
		// console.log("key up");
		switch(evt.keyCode){
			case 37:
				this.player.moveState = Player.MOVE_STOP;
			break;
			case 38:
			break;
			case 39:
				this.player.moveState = Player.MOVE_STOP;
			break;
			case 40:
			break;
		}
	};

	/*
	
	*/
	p.mouseDownHandler = function(evt){
		var x = evt.x - rootCanvas.offsetLeft;
		var y = evt.y - rootCanvas.offsetTop;

		var vec = new Vec2(x, y);
		// transform the canvas click position to the camera position
		stage.camera.matrix.invert().transform(vec);

		b2BodyFactory.create(vec.x, vec.y);
	};

	/*
	
	*/
	p.start = function(){
		console.log('start');
	};
	
	window.GameScene = GameScene;
}(window));