(function(window){
	function BuildingGenerator(){
		
	}
	var p = BuildingGenerator.prototype;

	p.init = function(layer){
		this.layer = layer;
		this.nextBuildingX = 0;
	};

	p.generate = function(){
		if(this.nextBuildingX < camera.right){
			var building = new Building();
			building.wx += this.nextBuildingX;
			building.wy = Math.random()*10 - 5;
			this.layer.addChild(building);
			this.nextBuildingX += building.width + Math.random()*50-25;

		}
	};

	window.BuildingGenerator = BuildingGenerator;
}(window));