(function(window){
	function BuildingGenerator(){
		
	}
	var p = BuildingGenerator.prototype;

	p.init = function(layer){
		this.layer = layer;
		this.nextBuilding = null;
		this.nextBuildingX = 0;
		this.createBuilding();
	};

	p.generate = function(){
		if(this.nextBuildingX < camera.right){
			this.layer.addChild(this.nextBuilding);
		}

		if(this.nextBuilding.inPosition){
			this.createBuilding();
		}
	};

	p.createBuilding = function(){
		this.nextBuilding = new Building();
		this.nextBuilding.name = "building " + this.layer.getNumChildren();
		this.nextBuilding.wy = camera.top;
		this.nextBuilding.wx = this.nextBuildingX;
		this.nextBuilding.ty = 0;
		this.nextBuildingX += this.nextBuilding.width;
	}

	window.BuildingGenerator = BuildingGenerator;
}(window));