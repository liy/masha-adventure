/*
GameScene
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function GameScene(){
		this.init();
	}
	var p = GameScene.prototype = new Scene();

	p.Scene_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.Scene_init();
		
		this.currentCamera = new Camera();
		this.currentCamera.init(800, 600, 0.5, 0.8);

		this.addListener('scene.fadeIn.complete', this.start);
	};

	/*
	
	*/
	p.start = function(){
		console.log('start');
	};

	/*
	
	*/
	p.update = function(){
		this.currentCamera.update();
	};

	/*
	
	*/
	p.draw = function(){
		
	};
	
	window.GameScene = GameScene;
}(window));