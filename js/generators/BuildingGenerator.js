define(['require', 'go/Building'], function(){
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
		// if(this.nextBuilding.inPosition){
		if(this.nextBuilding){
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
			this.layer.addChild(this.nextBuilding);

		console.log("generated: " + this.nextBuildingX);
	}

	window.BuildingGenerator = BuildingGenerator;
}(window));