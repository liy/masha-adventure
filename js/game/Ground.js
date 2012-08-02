/*
Ground
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function Ground(length){
		this.init(length);
	}
	var p = Ground.prototype = new GameObject();

	p.GameObject_init = p.init;
	/*
	
	*/
	p.init = function(length){
		this.GameObject_init();

		this.length = length | 800;

		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.2;
		fixDef.restitution = 0;
		fixDef.filter.categoryBits = b2BodyFactory.type.ground;
		fixDef.filter.maskBits = -1; // collide with anything

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_staticBody;
		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox((this.length/ SCALE) / 2, (10/SCALE) / 2);

		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
	};

	Object.defineProperty(p, "x", {
		get: function(){
			return this._x;
		},
		set: function(x){
			this._x = x;

			this.body.SetPosition(new b2Vec2(x, this._y));
		}
	});

	Object.defineProperty(p, "y", {
		get: function(){
			return this._y;
		},
		set: function(y){
			this._y = y;

			this.body.SetPosition(new b2Vec2(this._x, y));
		}
	});

	window.Ground = Ground;
}(window));