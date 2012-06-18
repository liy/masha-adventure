(function(window){
	// constructor
	function View(){
		// initialize container.
		this.initialize();
		
		// initialize view.
		this.init();
	};
	// extends MovieClip
	var p = View.prototype = new Container;
	
	p.init = function(){
		this.alpha = 0;
	}
	
	// make it available globally.
	window.View = View;
}(window));