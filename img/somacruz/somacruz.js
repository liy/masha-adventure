(function(window) {
Somacruz = function() {
	this.initialize();
}
Somacruz._SpriteSheet = new SpriteSheet(
	{
		images: ["somacruz.png"], 
		frames: [
					[0,0,24,42,0,-5,-1],
					[24,0,26,42,0,-3,-1],
					[50,0,29,43,0,-1,0],
					[79,0,30,43,0,0,0],
					[0,43,30,42,0,0,-1],
					[30,43,29,42,0,-1,-1],
					[59,43,27,41,0,-3,-2],
					[86,43,26,41,0,-4,-2],
					[0,85,26,42,0,-4,-1],
					[26,85,25,42,0,-5,-1],
					[51,85,23,43,0,-7,0],
					[74,85,23,43,0,-7,0],
					[97,85,25,42,0,-6,-1],
					[0,128,26,42,0,-5,-1],
					[26,128,25,42,0,-5,-1],
					[51,128,25,41,0,-5,-2],
					[76,128,26,42,0,-7,-1],
					[0,170,27,42,0,-9,-1],
					[27,170,29,41,0,-7,-2]
				]
	}
);
var Somacruz_p = Somacruz.prototype = new BitmapAnimation();
Somacruz_p.BitmapAnimation_initialize = Somacruz_p.initialize;
Somacruz_p.initialize = function() {
	this.BitmapAnimation_initialize(Somacruz._SpriteSheet);
	this.paused = false;
}
window.Somacruz = Somacruz;
}(window));

