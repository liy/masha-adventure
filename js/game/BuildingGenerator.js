/*
BuildingGenerator
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function BuildingGenerator(gameScene){
		this.gameScene = gameScene;
		this.trackX = -400;

		this.currentBuilding = this.deploy();
	}
	var p = BuildingGenerator.prototype;

	/*
	
	*/
	p.deploy = function(){
		var building = new Building();
		this.gameScene.buildingContainer.addChild(building.bitmap);
		this.gameScene.addGameObject(building);
		building.x = this.trackX;
		building.y = -500;

		return building;
	};

	/*
	
	*/
	p.process = function(){
		if(this.currentBuilding.bitmap.complete && this.trackX < stage.camera.right){
			// console.log('deploy');
			this.trackX += this.currentBuilding.bitmap.width + 2;
			this.currentBuilding = this.deploy();
		}
	};

	window.BuildingGenerator = BuildingGenerator;
}(window));