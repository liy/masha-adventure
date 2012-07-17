/**
 * Author: Zhengyi Li
 */

window.onload = function(){

	var canvas = document.getElementById('root-canvas');
	var stage = new Stage(canvas);

	function MashaAdventure(){
		var fps = 60;
		var interval = 1000/fps;
		setInterval(mainloop, interval);

		var bmp = new Bitmap('img/player.png');
		stage.addChild(bmp);

		var earth = new Earth();
		stage.addChild(earth);
		earth.x = 100;
		earth.y = 100;
		earth.radius = 50;

		function mainloop(){
			stage.draw();
		}
	}

	this.adventure = new MashaAdventure();
};