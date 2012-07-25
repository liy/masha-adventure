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
		
		var spriteSheet = new SpriteSheet();
		spriteSheet.load(DataStore.player);
		this.animation = new Animation(spriteSheet);
		this.animation.anchorX = 19;
		this.animation.anchorY = 21;

		this.y = -200;

		this.bodyDef = new b2BodyDef();
		this.bodyDef.type = b2Body.b2_dynamicBody;

		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;
		fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(19/2/SCALE, 43/2/SCALE);
        this.bodyDef.position.x = this.x;
		this.bodyDef.position.y = this.y/SCALE;
		this.playerBody = world.CreateBody(this.bodyDef).CreateFixture(fixDef);
	};

	/*
	
	*/
	p.update = function(){
		// update graphics in order to follows physics engine
		var vec = this.playerBody.m_body.GetPosition();
		this.animation.x = vec.x * SCALE;
		this.animation.y = vec.y * SCALE;
		// console.log(this.bodyDef.position.x, this.bodyDef.position.y)
	};

	window.Player = Player;
}(window));