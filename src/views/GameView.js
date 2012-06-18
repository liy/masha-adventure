(function(window){
	function GameView(){
		this.init();
	};
	GameView.prototype = new View;

	window.GameView = GameView;
}(window));