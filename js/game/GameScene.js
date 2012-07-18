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
		this.addListener('scene.fadeIn.complete', this.start);

		this.player = new Bitmap('img/player.png');
		this.player.addListener(Event.COMPLETE, bind(this, function(){
			console.log('load complete');
			this.player.anchorX = 9;
			this.player.anchorY = this.player.height;
		}));
		this.addChild(this.player);

		this.building = new Building();
		this.building.addListener(Event.COMPLETE, bind(this,function(){
			this.building.anchorX = this.building.width/2;
			this.building.anchorY = this.building.height;
		}));
		this.building.x = 100;
		this.addChild(this.building);

		this.paused = true;

		// document.addEventListener("keydown", bind(this, this.keyDownHandler), false);
		// document.addEventListener("keyup", bind(this, this.keyUpHandler), false);
		switches.addListener('switch press', bind(this, this.switchDownHandler));
		switches.addListener('switch release', bind(this, this.switchUpHandler));

		setInterval(bind(this, this.update), 50)
	};

	/*
	
	*/
	p.update = function(){
		if(!this.paused){
			this.player.x+=1;
		}
	};

	/*
	
	*/
	p.switchDownHandler = function(){
		this.paused = false;
	};

	/*
	
	*/
	p.switchUpHandler = function(){
		this.paused = true;
	};

	/*
	
	*/
	p.keyDownHandler = function(){
		console.log('key down');
	};

	/*

	*/
	p.keyUpHandler = function(){
		console.log("key up");
	};

	/*
	
	*/
	p.start = function(){
		console.log('start');
	};
	
	window.GameScene = GameScene;
}(window));