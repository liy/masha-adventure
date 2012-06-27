(function(window){
	function BuildingGenerator(){
		
	}
	var p = BuildingGenerator.prototype;

	p.init = function(layer){
		this.layer = layer;
		this.tx = 0;
	};

	p.generate = function(){
		
		if(this.tx < camera.x + camera.currentWidth/2){
			var building = new Building();
			this.layer.addChild(building);
			this.tx += building.width + Math.random()*100;
			building.wx += this.tx;
		}
	};

	window.BuildingGenerator = BuildingGenerator;
}(window));