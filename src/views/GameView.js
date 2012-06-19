(function(window){
	function GameView(){
		this.init();
		
		this.player = new Player();
		this.addChild(this.player);
	};
	var p = GameView.prototype = new View;
	
	p.resize = function(w, h){
		console.log(" resize gameVIew: " + this.player);
		this.player.x = 50;
		this.player.y = h - 100;
	};

	window.GameView = GameView;
}(window));