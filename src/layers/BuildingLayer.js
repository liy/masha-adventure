(function(window){
	function BuildingLayer(name){
		// call super constructor.
		Layer.call(this, name);
	}
	var p = BuildingLayer.prototype = new Layer;
	
	p.super_initialize = p.initialize;
	
	p.initialize = function(){
		this.super_initialize();
	}
	
	p.update = function(){
		
	}
	
	window.BuildingLayer = BuildingLayer;
}(window))