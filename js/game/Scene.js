/*
Abstract Scene
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function Scene(){
		this.init();
	}
	var p = Scene.prototype = new Container();

	/*
	
	*/
	p.fadeIn = function(seconds){
		this.alpha = 0;
		TweenLite.to(this, seconds, {alpha:1, onComplete:bind(this, function(){
			this.dispatchEvent(new Event('scene.fadeIn.complete'));
		})});
	};

	/*
	
	*/
	p.fadeOut = function(seconds){
		TweenLite.to(this, seconds, {alpha:0, onComplete:bind(this, function(){
			this.dispatchEvent(new Event('scene.fadeOut.complete'));
		})});
	};

	window.Scene = Scene;
}(window));