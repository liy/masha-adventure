/*
GroundManager
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function GroundManager(){
		
	}
	var p = GroundManager.prototype;

	/*
	
	*/
	p.init = function(gameScene){
		// ground
		var tx = 0;
		for(var i=0; i<10; ++i){
			var ground = new Ground();
			ground.x = tx/SCALE;

			tx += ground.length;
		}
	};

	window.GroundManager = GroundManager;
}(window));