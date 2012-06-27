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
			if(this.layer.getNumChildren() < 1)
			{
				var building = new Building();
				building.name = "building " + this.layer.getNumChildren();
				building.wx += this.nextBuildingX;
				// building.wy = Math.random()*10 - 5;
				this.layer.addChild(building);
				this.nextBuildingX += building.width + Math.random()*50-25;
			}
		}
		var b = this.layer.getChildAt(0);
		console.log(b.wx, b.wy, b.width, b.height)
		console.log(camera.left, camera.top, camera.right, camera.bottom)

		console.log(camera.containsRect(b.wx, b.wy, b.width, b.height));
	};

	window.BuildingGenerator = BuildingGenerator;
}(window));