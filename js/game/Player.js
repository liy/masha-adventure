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

		this.y = -100;

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;

		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;
		fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(19/2/SCALE, 43/2/SCALE);
        bodyDef.position.x = this.x;
		bodyDef.position.y = this.y/SCALE;
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	};

	window.Player = Player;
}(window));