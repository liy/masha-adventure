/*
Building
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function Building(){
		this.init();
	}
	var p = Building.prototype = new GameObject();

	p.GameObject_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.GameObject_init();

		var bmp = new Bitmap('img/buildings/building-1.png');
		this.addChild(bmp);
	};

	window.Building = Building;
}(window));