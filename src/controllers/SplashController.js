(function(window){
	function SplashController(){
		this.fadeIn = function(){
			this.view.resize(adventure.stage.canvas.width, adventure.stage.canvas.height);
			
			TweenLite.to(this.view, 1, {alpha:1, delay:1, onComplete:function(){
				setTimeout(function(){
					splashController.fadeOut(adventure.goTitle);
				}, 3000);
			}});
		}
	};
	SplashController.prototype = new Controller;
	
	window.splashController = new SplashController();
}(window));