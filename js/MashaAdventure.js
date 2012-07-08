/**
 * Author: Zhengyi Li
 */

window.onload = function(){

	var canvas = document.getElementById('root-canvas');
	var stage = new Stage(canvas);

	this.adventure = new function(){
		var fps = 60;
		var interval = 1000/60
		setInterval(mainloop, interval)

		var container = new Container();
		stage.addChild(container);

		var bmp = new Bitmap('img/paw.png');
		container.addChild(bmp);

		container.x = -100;
		bmp.matrix.translate(100, 100);
		trace(bmp.matrix.toString())
	};

	function mainloop(){
		stage.draw();
	}
	
	this.camera = new Camera();
	this.camera.init(canvas.width, canvas.height, 0.5, 0.7);
};