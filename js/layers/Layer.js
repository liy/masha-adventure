define(['require', 'http://code.createjs.com/easeljs-0.4.2.min.js'], function(){
	/*
		Layer is an abstract class, should not be used to create instance.
	*/
	function Layer(name){
		this.initialize();
		this.name = name;
	}
	var p = Layer.prototype = new Container;

	p.update = function(){
		for(var i=0; i<this.getNumChildren(); ++i){
			var go = this.getChildAt(i);
			go.update();
		}
	}
	
	window.Layer = Layer;
});