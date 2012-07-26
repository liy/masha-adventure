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

	p.GameObject_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.GameObject_init();

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
		this.animation.x = vec.x * SCALE;
		this.animation.y = vec.y * SCALE;
		// console.log(this.body)

		// apply force
		this.body.ApplyForce(this.force, this.body.GetPosition());

		var velocity = this.body.GetLinearVelocity();
		// restrict velocity
		if(velocity.x > 3){
			velocity.x = 3;
		}
		else if(velocity.x< -3){
			velocity.x = -3;
		}
		this.body.SetLinearVelocity(velocity);
	};

	/*
	
	*/
	p.jump = function(){
		this.body.ApplyImpulse(new b2Vec2(0, -5), new b2Vec2(this.body.x, this.body.y));
	};

	window.Player = Player;
}(window));