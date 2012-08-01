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
		wall: 0x0040,
		groundSensor: 0x0080
	};

	/*
	*/
	b2BodyFactory.create = function(x, y){
		// create body
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = x/SCALE;
		bodyDef.position.y = y/SCALE;
		var body = world.CreateBody(bodyDef);

		// create fixtures
		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;

		var ran = Math.floor(Math.random() * 4);
		if(ran === 0){
		// if(false){
			// square
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox(0.52, 0.52);
		}
		else if(ran === 1){
		// else if(false){
			// rectangle
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox(1, 0.4);
		}
		else if(ran === 2){
		// else if(false){
			// triangle
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsArray(new Array(new b2Vec2(0, -1), new b2Vec2(1, 1), new b2Vec2(-1, 1)) , 3);
		}
		else{
			fixDef.shape = new b2CircleShape();
			fixDef.shape.SetRadius(1);

			// create circle sensor for circle shape
			var sensorFix = new b2FixtureDef();
			sensorFix.isSensor = true;
			sensorFix.shape = new b2CircleShape();
			sensorFix.shape.SetRadius(1.5);
			sensorFix.filter.categoryBits = b2BodyFactory.type.groundSensor;
			// Only sense the ground.
			sensorFix.filter.maskBits = b2BodyFactory.type.ground;
			body.CreateFixture(sensorFix);
		}
		body.CreateFixture(fixDef);

		return body;
	};

	window.b2BodyFactory = b2BodyFactory;
}(window));