(function(window){
	function GameController(){
		
	};
	var p = GameController.prototype = new Controller;
	
	p.fadeIn = function(completeFunc){
		this.view.resize(adventure.stage.canvas.width, adventure.stage.canvas.height);
		TweenLite.to(this.view, 1, {alpha:1, onComplete:completeFunc});
	}
	
	// main loop
	function tick(){
		
	}
	
	window.gameController = new GameController();
	
}(window))