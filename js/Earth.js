require(['require', 'layers/Layer', 'http://code.createjs.com/easeljs-0.4.2.min.js', 'go/GameObject'], function(){

	function Earth(){
		this.initialize();
		this.buildingLayer = new BuildingLayer();
		this.addChild(this.buildingLayer);
	}
	var p = Earth.prototype = new Layer;

	p.Layer_initialize = p.initialize;
	p.initialize = function(){
		this.Layer_initialize();

		this.g = new Graphics();

		this.shape = new Shape(this.g);
		this.addChild(this.shape);

		this.radius = 800;
		this.pv = new Vector2D(this.radius, 0);
		this.rotateDelta = -0.001;
		this.chord = 800;
		this.radian = -(Math.PI-Math.acos(1 - (this.chord*this.chord)/(2*this.radius*this.radius)))/2;
		console.log();
	}

	p.rotate = function(){
		this.radian += this.rotateDelta;

		this.pv.zero();
		this.pv.len = this.radius;
		this.pv.rotate(this.radian);
		this.pv.y += this.radius;
	}

	p.update = function(){
		this.rotate();

		var len = this.buildingLayer.getNumChildren();
		if(len != 0){
			for(var i=0; i<len; ++i){
				var building = this.buildingLayer.getChildAt(i);
				// building.wx = Math.cos(building.radian) * this.radius;
				// building.wy = Math.sin(building.radian) * this.radius + this.radius; 
				// building.rotation = 90 + building.radian * 180/Math.PI;

				building.update();
			}

			var tailBuilding = this.buildingLayer.getChildAt(0);
			if(!camera.hitRect(building.wx-building.regX, tailBuilding.wy-tailBuilding.height, tailBuilding.width, tailBuilding.height)){
				tailBuilding.destroy();
				this.buildingLayer.removeChildAt(tailBuilding);
			}
		}
	}

	window.Earth = Earth;
});