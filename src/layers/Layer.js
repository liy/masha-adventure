(function(window){
	/*
		Layer is an abstract class, should not be used to create instance.
	*/
	function Layer(name){
		this.initialize();
		this.name = name;
	}
	var p = Layer.prototype = new Container;
	
	window.Layer = Layer;
}(window))