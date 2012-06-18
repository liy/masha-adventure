(function(window){
	function Controller(){
		
	};
	var p = Controller.prototype;
	
	// main loop
	p.init = function(view){
		this.view = view;
		this.view.alpha = 0;
	}
	
	p.fadeIn = function(completeFunc){
		TweenLite.to(this.view, 1, {alpha:1, onComplete:completeFunc});
	}
	
	p.fadeOut = function(completeFunc){
		TweenLite.to(this.view, 1, {alpha:0, onComplete:completeFunc});
	};
	
	window.Controller = Controller;
}(window))