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
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;

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
	};

	/*
	
	*/
	p.switchUpHandler = function(){
		this.paused = true;
	};

	/*
	
	*/
	p.keyDownHandler = function(){
		console.log('key down');
	};

	/*

	*/
	p.keyUpHandler = function(){
		console.log("key up");
	};

	/*
	
	*/
	p.start = function(){
		console.log('start');
	};
	
	window.GameScene = GameScene;
}(window));