(function(window){
	function GameObject(){
		this.initialize();
	};
	var p = GameObject.prototype = new Container();
	
	p.Container_initialize = p.initialize;
	p.initialize = function(){
		this.Container_initialize();
		
		this.wx = 0;
		this.wy = 0;
	}
	
	p.update = function(){
		camera.transform(this);
	}
	
	window.GameObject = GameObject;
}(window))