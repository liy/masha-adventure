define(['require', 'http://code.createjs.com/easeljs-0.4.2.min.js'], function(){
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
	
	p.roundup = function(){
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}

	window.GameObject = GameObject;
});