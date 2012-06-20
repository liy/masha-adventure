(function(window){
	
	function Player(){
		this.initialize();
		
		this.velocity = new Vector2D();
		
		this.bitmap = new Bitmap('assets/images/player.png');
		this.addChild(this.bitmap);
		
	};
	Player.prototype = new Container
	
	window.Player = Player;
}(window));