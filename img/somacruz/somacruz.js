(function(window) {
Somacruz_instance_1 = function() {
	this.initialize();
}
Somacruz_instance_1._SpriteSheet = new SpriteSheet({images: ["somacruz.png"], frames: [[55,126,24,42,0,-5,-1],[29,85,26,42,0,-3,-1],[0,85,29,43,0,-1,0],[0,0,30,43,0,0,0],[0,43,30,42,0,0,-1],[0,128,29,42,0,-1,-1],[27,211,27,41,0,-3,-2],[54,169,26,41,0,-4,-2],[30,0,26,42,0,-4,-1],[29,169,25,42,0,-5,-1],[79,126,23,43,0,-7,0],[80,83,23,43,0,-7,0],[55,84,25,42,0,-6,-1],[30,42,26,42,0,-5,-1],[56,0,25,42,0,-5,-1],[56,42,25,41,0,-5,-2],[29,127,26,42,0,-7,-1],[0,211,27,42,0,-9,-1],[0,170,29,41,0,-7,-2]]});
var Somacruz_instance_1_p = Somacruz_instance_1.prototype = new BitmapAnimation();
Somacruz_instance_1_p.BitmapAnimation_initialize = Somacruz_instance_1_p.initialize;
Somacruz_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(Somacruz_instance_1._SpriteSheet);
	this.paused = false;
}
window.Somacruz_instance_1 = Somacruz_instance_1;
}(window));

