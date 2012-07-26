/*
Player
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function Player(){
		this.init();
	}
	var p = Player.prototype = new GameObject();

	Player.MOVE_LEFT = 'left';
	Player.MOVE_RIGHT = 'right';
	Player.MOVE_STOP = 'stop';

	p.GameObject_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.GameObject_init();

		this.moveState = Player.MOVE_STOP;

		this.desiredVel = 5;

		this.force = new b2Vec2();
		
		var spriteSheet = new SpriteSheet();
		spriteSheet.load(DataStore.player);
		this.animation = new Animation(spriteSheet);
		this.animation.anchorX = 19;
		this.animation.anchorY = 21;

		this.y = -200;

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.allowSleep = false;

		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.2;
		fixDef.restitution = 0;
		fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(19/2/SCALE, 43/2/SCALE);
        bodyDef.position.x = this.x;
		bodyDef.position.y = this.y/SCALE;
		bodyDef.fixedRotation = true;

		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
	};

	/*
	
	*/
	p.update = function(){
		// update graphics in order to follows physics engine
		var vec = this.body.GetPosition();
		this.animation.x = vec.x * SCALE + 0.5|0;
		this.animation.y = vec.y * SCALE + 0.5|0;
		// console.log(this.body)

		var vel = this.body.GetLinearVelocity();
		switch(this.moveState){
			case Player.MOVE_RIGHT:
				// this.desiredVel = 5;
				this.desiredVel = Math.min(vel.x + 0.1, 5);
			break;
			case Player.MOVE_LEFT:
				// this.desiredVel = -5;
				this.desiredVel = Math.max(vel.x - 0.1, -5);
			break;
			case Player.MOVE_STOP:
				// this.desiredVel = 0;
				this.desiredVel *= 0.9;
			break;
		}
		var deltaVel = this.desiredVel - vel.x;
		//disregard time factor
		var impulse = this.body.GetMass() * deltaVel;
		this.body.ApplyImpulse(new b2Vec2(impulse, 0), this.body.GetWorldCenter());
	};

	/*
	
	*/
	p.jump = function(){
		this.body.ApplyImpulse(new b2Vec2(0, -5), new b2Vec2(this.body.x, this.body.y));
	};

	window.Player = Player;
}(window));