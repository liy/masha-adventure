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

		this.player = new Bitmap('img/player.png');
		this.player.addListener(Event.COMPLETE, bind(this, function(){
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

		setInterval(bind(this, this.update), 50);

		var spriteSheet = new SpriteSheet(
			{
				images: ["img/somacruz/somacruz.png"],
				frames: [
							[55,126,24,42,0,-5,-1],[29,85,26,42,0,-3,-1],[0,85,29,43,0,-1,0],[0,0,30,43,0,0,0],[0,43,30,42,0,0,-1],[0,128,29,42,0,-1,-1],[27,211,27,41,0,-3,-2],[54,169,26,41,0,-4,-2],[30,0,26,42,0,-4,-1],[29,169,25,42,0,-5,-1],[79,126,23,43,0,-7,0],[80,83,23,43,0,-7,0],[55,84,25,42,0,-6,-1],[30,42,26,42,0,-5,-1],[56,0,25,42,0,-5,-1],[56,42,25,41,0,-5,-2],[29,127,26,42,0,-7,-1],[0,211,27,42,0,-9,-1],[0,170,29,41,0,-7,-2]
						],
				animations: {
					// start, end, next, frequency
					// Set next to false to makes it pause when it reaches end.
					run: [0, 16, true, 3],
					stop: {
						frames: [17, 18, 19],
						next: false,
						frequency: 2
					},
					stopEnd: 19
				}
			}
		);

		var animation = new Animation(spriteSheet);
		this.addChild(animation);
		animation.play();
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