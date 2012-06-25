(function(window){
	
	var inertiaTimeoutID = 0;
	
	function Player(data){
		this.initialize();
		
		var spriteSheet = new SpriteSheet(data);
		if(!spriteSheet.complete){
			spriteSheet.onComplete = bind(this, function(){
				this.animation = new BitmapAnimation(spriteSheet);
				this.stand();
				this.addChild(this.animation);
			});
		}
		else{
			this.animation = new BitmapAnimation(spriteSheet);
			this.stand();
			this.addChild(this.animation);
		}
	};
	var p = Player.prototype = new GameObject();
	
	p.GameObject_initialize = p.initialize;
	p.initialize = function(){
		this.GameObject_initialize();
		
		this.velocity = new Vector2D();
	}
	
	p.run = function(dir){
		if(this.animation.currentAnimation != 'run'){
			clearTimeout(inertiaTimeoutID);
			TweenLite.killTweensOf(this.velocity);
			if(this.scaleX != dir && dir != 0)
				this.scaleX = dir;
			this.animation.gotoAndPlay("run");
		}
	}
	
	p.stand = function(){
		this.animation.gotoAndPlay("stand");
	}
	
	p.stopping = function(){
		this.animation.gotoAndPlay("stopping");
		// inertiaTimeoutID = setTimeout(bind(this, function(){
		// 	console.log("zero v")
		// 	this.velocity.zero();
		// }), 160);
		TweenLite.to(this.velocity, 0.5, {x:0, y:0});
	}
	
	p.super_update = p.update;
	p.update = function(){
		this.wx += this.velocity.x;
		this.wy += this.velocity.y;
		
		this.super_update();
		
		this.roundup();
	}
	
	p.roundup = function(){
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}
	
	Object.defineProperty(p, "width", {
		set: function(value){
			//this.getFrame(0).width;
		},
		get: function(){
			// console.log(this.animation.spriteSheet.getFrame(this.animation.currentFrame))
			return this.animation.spriteSheet.getFrame(this.animation.currentFrame).rect.width;
		}
	});
	
	Object.defineProperty(p, "height", {
		set: function(value){
			//this.getFrame(0).width;
		},
		get: function(){
			return this.animation.spriteSheet.getFrame(this.animation.currentFrame).rect.height;		}
	});
	
	window.Player = Player;
}(window));