/*
Building
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function Building(){
		this.init();
	}
	var p = Building.prototype = new GameObject();

	p.GameObject_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.GameObject_init();

		this.bitmap = new Bitmap();
		// this.bitmap = new Bitmap('img/buildings/building-'+(Math.floor(Math.random()*26)+1)+'.png');
		// this.bitmap = new Bitmap('img/buildings/building-2.png');
		this.bitmap.addListener(Event.COMPLETE, bind(this, this.loadedHandler));
	};

	/*
	
	*/
	p.destroy = function(){
		this.bitmap.parent.removeChild(this.bitmap);
		world.DestroyBody(this.body);
	};

	/*
	
	*/
	p.load = function(imageOrURL){
		this.bitmap.load(imageOrURL);
	};

	/*
	
	*/
	p.loadedHandler = function(e){
		console.log('building complete');

		this.bitmap.removeListener(Event.COMPLETE, bind(this, this.loadedHandler));

		// body definition
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = (this.x + this.bitmap.width/2)/SCALE;
		bodyDef.position.y = (this.y - this.bitmap.height/2)/SCALE;
		bodyDef.fixedRotation = true;

		// create body.
		this.body = world.CreateBody(bodyDef);

		// create body fixture definition
		var bodyRectFixDef = new b2FixtureDef();
		bodyRectFixDef.density = 1.0;
		bodyRectFixDef.friction = 0.0;
		bodyRectFixDef.restitution = Math.random()*0.3;
		bodyRectFixDef.shape = new b2PolygonShape();
		bodyRectFixDef.shape.SetAsBox(this.bitmap.width/2/SCALE, this.bitmap.height/2/SCALE);
		bodyRectFixDef.filter.maskBits = ~b2BodyFactory.type.player;
		this.body.CreateFixture(bodyRectFixDef);

		// offset the bitmap, so it match the body position
		this.bitmap.anchorX = this.bitmap.width/2;
		this.bitmap.anchorY = this.bitmap.height/2;

	};

	/*
	
	*/
	p.update = function(){
		if(this.body){
			// update graphics in order to follows physics engine
			var vec = this.body.GetPosition();
			this.bitmap.x = vec.x * SCALE + 0.5|0;
			this.bitmap.y = vec.y * SCALE + 0.5|0;
		}
	};

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "complete", {
		get: function(){
			return this.bitmap.complete;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "width", {
		get: function(){
			return this.bitmap.width;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "right", {
		get: function(){
			return this.bitmap.x + this.bitmap.width;
		}
	});

	Object.defineProperty(p, "x", {
		get: function(){
			return this._x;
		},
		set: function(x){
			this.bitmap.x = x;
			this._x = x;
		}
	});

	Object.defineProperty(p, "y", {
		get: function(){
			return this._y;
		},
		set: function(y){
			this.bitmap.y = y;
			this._y = y;
		}
	});

	window.Building = Building;
}(window));