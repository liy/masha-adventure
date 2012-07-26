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

		window.world = new b2World(new b2Vec2(0, 10), true);

		// box2d debug draw
		this.debugDraw = new b2DebugDraw();
		this.debugDraw.SetSprite(rootCanvas.getContext('2d'));
		this.debugDraw.SetDrawScale(SCALE);
		this.debugDraw.SetFillAlpha(1);
		this.debugDraw.SetLineThickness(1.0);
		this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(this.debugDraw);

		// ground
		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.2;
		fixDef.restitution = 0;

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_staticBody;
		// positions the center of the object (not upper left!)
		bodyDef.position.x = 0;
		bodyDef.position.y = 0;

		fixDef.shape = new b2PolygonShape();
		// half width, half height.
		fixDef.shape.SetAsBox((600 / SCALE) / 2, (20/SCALE) / 2);
		world.CreateBody(bodyDef).CreateFixture(fixDef);



		this.paused = true;

		switches.addListener('switch press', bind(this, this.switchDownHandler));
		switches.addListener('switch release', bind(this, this.switchUpHandler));
		rootCanvas.addEventListener("mousedown", bind(this, this.mouseDownHandler), false);
		document.addEventListener("keydown", bind(this, this.keyDownHandler), false);
		document.addEventListener("keyup", bind(this, this.keyUpHandler), false);

		this.player = new Player();
		this.player.animation.gotoAndPlay('run');
		this.addChild(this.player.animation);
	};

	/*
	
	*/
	p.update = function(){
		// console.log('update')
		world.Step(1/60, 10, 10);
		world.ClearForces();

		this.player.update();

		stage.camera.x = this.player.animation.x;
		stage.camera.y = this.player.animation.y;
	};

	p.Scene_draw = p.draw;
	/*
	
	*/
	p.draw = function(ctx){
		world.DrawDebugData();
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
	};

	/*
	
	*/
	p.keyDownHandler = function(evt){
		console.log('key down');

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
				force.x = -150;
			break;
			case 38:
				// force.y = -150;
			break;
			case 39:
				force.x = 150;
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
		console.log("key up");
		switch(evt.keyCode){
			case 37:
				this.player.force.SetZero();
			break;
			case 38:
			break;
			case 39:
				this.player.force.SetZero();
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