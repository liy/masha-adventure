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
		this.animation.alpha = 0.2;

		this.y = -200;

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.allowSleep = false;

		// body
		var bodyFixDef = new b2FixtureDef();
		bodyFixDef.density = 1.0;
		bodyFixDef.friction = 0.0;
		bodyFixDef.restitution = 0;
		bodyFixDef.shape = new b2PolygonShape();
        bodyFixDef.shape.SetAsBox(19/2/SCALE, 43/2/SCALE);
        bodyFixDef.filter.categoryBits = b2BodyFactory.type.player;
        bodyFixDef.filter.maskBits = ~b2BodyFactory.type.player;
        bodyFixDef.filter.groupIndex = -1;
        bodyDef.position.x = this.x;
		bodyDef.position.y = this.y/SCALE;
		bodyDef.fixedRotation = true;

		// foot sensor
		var sensorFixDef = new b2FixtureDef();
		sensorFixDef.shape = new b2PolygonShape();
		sensorFixDef.isSensor = true;
		sensorFixDef.shape.SetAsOrientedBox(4/SCALE, 4/SCALE, new b2Vec2(0, 21.5/SCALE), 0);

		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(bodyFixDef);
		var sensorFix = this.body.CreateFixture(sensorFixDef);

		// Set the foot sensor contact listener.
		sensorFix.BeginContact = bind(this, this.sensorBeginContact);
		sensorFix.EndContact = bind(this, this.sensorEndContact);
	};

	/*
	
	*/
	p.sensorBeginContact = function(contact){
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

		//disregard time factor
		this.body.ApplyImpulse(this.impulse, this.body.GetWorldCenter());
	};

	/*
	
	*/
	p.jump = function(){
		if(this.canJump){
			var vel = this.body.GetLinearVelocity();
			deltaVel = (-1 - vel.y);
			this.impulse.y = this.body.GetMass() * deltaVel;

			// only apply jump impulse for a few second.
			this.jumpTimeoutID = setTimeout(bind(this, function(){
				this.impulse.y = 0;
			}), 220);
		}
	};

	/*
	
	*/
	p.stopJump = function(){
		this.impulse.y = 0;
		clearTimeout(this.jumpTimeoutID);
	};

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "canJump", {
		get: function(){
			return this.numFootContacts > 0;
		}
	});

	p._landed = function(){
		this.jumping = false;
	};

	window.Player = Player;
}(window));