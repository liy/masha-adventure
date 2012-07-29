/*
b2BodyFactory
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function b2BodyFactory(){
		
	}
	var p = b2BodyFactory.prototype;

	b2BodyFactory.type = {
		triangle: 0x0001,
		square: 0x0002,
		rectangle: 0x0004,
		circle: 0x0008,
		ground: 0x0010,
		player: 0x0020,
		wall: 0x0040
	};

	/*
	*/
	b2BodyFactory.create = function(x, y){
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;

		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;

		var ran = Math.floor(Math.random() * 4);
		if(ran === 0){
			// square
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox(0.52, 0.52);
			fixDef.filter.categoryBits = b2BodyFactory.type.square;
			fixDef.filter.maskBits = b2BodyFactory.type.square | b2BodyFactory.type.ground;
		}
		else if(ran === 1){
			// rectangle
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox(1, 0.4);
			fixDef.filter.categoryBits = b2BodyFactory.type.rectangle;
			fixDef.filter.maskBits = b2BodyFactory.type.rectangle | b2BodyFactory.type.ground;
		}
		else if(ran === 2){
			// triangle
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsArray(new Array(new b2Vec2(0, -1), new b2Vec2(1, 1), new b2Vec2(-1, 1)) , 3);
			fixDef.filter.categoryBits = b2BodyFactory.type.triangle;
			fixDef.filter.maskBits = b2BodyFactory.type.triangle | b2BodyFactory.type.ground;
		}
		else{
			fixDef.shape = new b2CircleShape();
			fixDef.shape.SetRadius(1);
			fixDef.filter.categoryBits = b2BodyFactory.type.circle;
			fixDef.filter.maskBits = b2BodyFactory.type.circle | b2BodyFactory.type.ground | b2BodyFactory.type.wall | b2BodyFactory.type.player;
		}
		bodyDef.position.x = x/SCALE;
		bodyDef.position.y = y/SCALE;

		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	};

	window.b2BodyFactory = b2BodyFactory;
}(window));