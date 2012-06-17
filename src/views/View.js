(function(window){
	
	// constructor
	function View(){
		this.alpha = 0;
	};
	// extends MovieClip
	var p = View.prototype = new Container();
	
	p.fadeOut = function(){
		TweenLite.to(this, 0.5, {alpha:0});
	};
	
	p.fadeIn = function(){
		TweenLite.to(this, 1, {alpha:1});
	}
	
	// make it available globally.
	window.View = View;
}(window));