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

		this.numFootContacts = 0;

		this.desiredVel = 5;

		this.impulse = new b2Vec2(0, 0);

		this.doJumping = false;
		this.jumpTimeoutID = 0;
		
		var spriteSheet = new SpriteSheet();
		spriteSheet.load(DataStore.player);
		this.animation = new Animation(spriteSheet);
		this.animation.anchorX = 19;
		this.animation.anchorY = 21;
		// this.animation.alpha = 0.2;
		this.animation.gotoAndPlay('run');

		this.y = -200;

		// body
		var bodyRectFixDef = new b2FixtureDef();
		bodyRectFixDef.density = 1.0;
		bodyRectFixDef.friction = 0.0;
		bodyRectFixDef.restitution = 0;
		bodyRectFixDef.shape = new b2PolygonShape();
		// bodyRectFixDef.shape.SetAsBox(19/2/SCALE, 43/2/SCALE);
		bodyRectFixDef.shape.SetAsOrientedBox(19/2/SCALE, (43/2-19/4)/SCALE, new b2Vec2(0, -19/4/SCALE), 0);
		bodyRectFixDef.filter.categoryBits = b2BodyFactory.type.player;
		bodyRectFixDef.filter.maskBits = ~b2BodyFactory.type.player;
		// bodyRectFixDef.filter.groupIndex = -1;

		var bodyCircleFixDef = new b2FixtureDef();
		bodyCircleFixDef.density = 1.0;
		bodyCircleFixDef.friction = 0.0;
		bodyCircleFixDef.restitution = 0;
		bodyCircleFixDef.shape = new b2CircleShape();
		bodyCircleFixDef.shape.SetRadius(19/2/SCALE);
		bodyCircleFixDef.shape.SetLocalPosition(new b2Vec2(0, (43/2-19/2)/SCALE));
		bodyCircleFixDef.filter.categoryBits = b2BodyFactory.type.player;
		bodyCircleFixDef.filter.maskBits = ~b2BodyFactory.type.player;
		// bodyCircleFixDef.filter.groupIndex = -1;

		// foot sensor
		var sensorFixDef = new b2FixtureDef();
		sensorFixDef.shape = new b2PolygonShape();
		sensorFixDef.isSensor = true;
		sensorFixDef.filter.groupIndex = -1;
		sensorFixDef.shape.SetAsOrientedBox(4/SCALE, 4/SCALE, new b2Vec2(0, 21.5/SCALE), 0);

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.allowSleep = false;
		bodyDef.position.x = this.x;
		bodyDef.position.y = this.y/SCALE;
		bodyDef.fixedRotation = true;
		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(bodyRectFixDef);
		this.body.CreateFixture(bodyCircleFixDef);
		var sensorFix = this.body.CreateFixture(sensorFixDef);

		// Set the foot sensor contact listener.
		sensorFix.BeginContact = bind(this, this.sensorBeginContact);
		sensorFix.EndContact = bind(this, this.sensorEndContact);
	};

	/*
	
	*/
	p.sensorBeginContact = function(contact){
		console.log('BeginContact');
		++this.numFootContacts;
	};

	/*
	
	*/
	p.sensorEndContact = function(contact){
		--this.numFootContacts;
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
		var deltaVel;
		switch(this.moveState){
			case Player.MOVE_RIGHT:
				deltaVel = (8 - vel.x)*0.2;
				this.impulse.x = this.body.GetMass() * deltaVel;
			break;
			case Player.MOVE_LEFT:
				deltaVel = (-8 - vel.x)*0.2;
				this.impulse.x = this.body.GetMass() * deltaVel;
			break;
			case Player.MOVE_STOP:
				// this.desiredVel = 0;
				deltaVel = (0 - vel.x)*0.2;
				this.impulse.x = this.body.GetMass() * deltaVel;
			break;
		}

		if(this.jumpTimeoutID !== 0){
			deltaVel = (-10 - vel.y);
			this.impulse.y = this.body.GetMass() * deltaVel;
		}

		//disregard time factor
		this.body.ApplyImpulse(this.impulse, this.body.GetWorldCenter());
	};

	/*
	
	*/
	p.jump = function(){
		if(this.canJump){
			clearTimeout(this.jumpTimeoutID);
			var vel = this.body.GetLinearVelocity();
			console.log(vel.y);
			deltaVel = (-10 - vel.y);
			this.impulse.y = this.body.GetMass() * deltaVel;


			// only apply jump impulse for a few second.
			this.jumpTimeoutID = setTimeout(bind(this, function(){
				this.impulse.y = 0;
				this.jumpTimeoutID = 0;
			}), 120);
		}
	};

	/*
	
	*/
	p.stopJump = function(){
		this.impulse.y = 0;
		clearTimeout(this.jumpTimeoutID);
		this.jumpTimeoutID = 0;
	};

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "canJump", {
		get: function(){
			return this.numFootContacts > 0;
			// return true;
		}
	});

	p._landed = function(){
		this.jumping = false;
	};

	Object.defineProperty(p, "x", {
		get: function(){
			return this.animation.x;
		},
		set: function(x){
			this.animation.x = x;
		}
	});

	Object.defineProperty(p, "y", {
		get: function(){
			return this.animation.y;
		},
		set: function(y){
			this.animation.y = y;
		}
	});

	window.Player = Player;
}(window));