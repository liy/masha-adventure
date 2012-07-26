/*
b2BodyFactory
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function b2BodyFactory(){
		
	}
	var p = b2BodyFactory.prototype;

	/*
	*/
	b2BodyFactory.create = function(x, y){
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;

		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;
		if(Math.random() < 0.5){
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox(0.52, 0.52);
		}
		else{
			fixDef.shape = new b2CircleShape();
			fixDef.shape.SetRadius(1);
		}
		console.log(x, y);
		bodyDef.position.x = x/SCALE;
		bodyDef.position.y = y/SCALE;

		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	};

	window.b2BodyFactory = b2BodyFactory;
}(window));