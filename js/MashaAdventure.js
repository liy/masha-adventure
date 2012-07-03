/**
 * Author: Zhengyi Li
 */

window.onload = function(){

require(['http://code.createjs.com/easeljs-0.4.2.min.js', 'Scene', 'Camera', 'Earth', 'test'], function(){
	var canvas = document.getElementById('root-canvas')
	this.adventure = new function(){
		this.stage = new Stage(canvas)
		
		this.init = function(){
			var scene = new Scene();
			this.stage.addChild(scene);

			Ticker.setFPS(60);
			Ticker.addListener(this);

			this.tick = function(){
				scene.update();
				this.stage.update();
			};

			this.stage.canvas.onblur = function(e){
				gameInput.enabled = false;
				switches.enabled = false;
			};

			this.stage.canvas.onfocus = function(e){
				gameInput.enabled = true;
				switches.enabled = true;
			};

			this.stage.canvas.focus();
		}
	};
	
	this.camera = new Camera();
	this.camera.init(canvas.width, canvas.height, 0.5, 0.7);
	
	adventure.init();
});

};