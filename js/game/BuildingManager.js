/*
BuildingManager
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function BuildingManager(){
	}
	var p = BuildingManager.prototype;

	/*
	
	*/
	p.init = function(gameScene){
		this.gameScene = gameScene;

		this.image = new Image();
		this.image.src = 'img/buildings/building-2.png';

		this.buildingContainer = new Container();
		gameScene.addChild(this.buildingContainer);

		// holding the building game objects.
		this.buildings = [];

		this.trackX = 0;

		this.currentBuilding = this.deploy();
	};

	/*
	
	*/
	p.update = function(){
		var len = this.buildings.length;
		for(var i=0; i<len; ++i){
			this.buildings[i].update();
		}

		var firstBuilding = this.buildings[0];
		if(firstBuilding.bitmap.aabb.upperBound.x < stage.camera.left){
			this.buildings.shift();
			firstBuilding.destroy();
		}
	};

	/*
	
	*/
	p.deploy = function(){
		var building = new Building();
		this.buildings.push(building);

		// add the building bitmap to the display list.
		this.buildingContainer.addChild(building.bitmap);

		// positioning
		building.x = this.trackX;
		building.y = -500;

		building.load(this.image);

		return building;
	};

	/*
	
	*/
	p.process = function(){
		if(this.buildingContainer.numChildren === 0)
			return;

		if(this.currentBuilding.complete && this.trackX < stage.camera.right){
			this.trackX += this.currentBuilding.bitmap.width + 10;
			this.currentBuilding = this.deploy();
		}
	};

	window.BuildingManager = BuildingManager;
}(window));