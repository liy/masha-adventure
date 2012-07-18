/**
 * Author: Zhengyi Li
 */

window.onload = function(){
	function MashaAdventure(){
		this.currentScene = null;
		this._fps = 60;
		this._interval = this._fps/1000;

		setInterval(mainloop, this._interval);

		this.goScene('game');
	}
	var p = MashaAdventure.prototype;
	/*
	
	*/
	p.goScene = function(sceneName){
		if(this.currentScene != null)
			this.currentScene.fadeOut(1);

		switch(sceneName){
			case 'game':
				this.currentScene = new GameScene();
			break;
			case 'title':
				this.currentScene = new TitleScene();
			break;
		}

		stage.addChild(this.currentScene);
		this.currentScene.fadeIn(1);
	};

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "fps", {
		get: function(){
			return this._fps;
		},
		set: function(fps){
			this._fps = fps;
		}
	});

		/*
	
	*/
	mainloop = function(){
		stage.draw();
	};

	this.rootCanvas = document.getElementById('root-canvas');
	this.stage = new Stage(this.rootCanvas);
	this.stage.camera = new Camera(800, 600, 0.5, 0.5);
	this.adventure = new MashaAdventure();
};