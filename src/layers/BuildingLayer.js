(function(window){
	function BuildingLayer(name){
		this.initialize();
		this.name = name;
	}
	var p = BuildingLayer.prototype = new Layer;

	p.update = function(){
		var len = this.getNumChildren();
		if(len != 0){
			for(var i=0; i<len; ++i){
				var building = this.getChildAt(i);
				building.update();
			}

			var tailBuilding = this.getChildAt(0);
			if(tailBuilding.inPosition && !camera.hitRect(tailBuilding.wx, tailBuilding.wy-tailBuilding.height, tailBuilding.width, tailBuilding.height)){
				tailBuilding.destroy();
				this.removeChild(tailBuilding);
			}
		}
	}
	
	window.BuildingLayer = BuildingLayer;
}(window))