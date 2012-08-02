(function(window){
	function GameObject(){
		this.init();
	}
	var p = GameObject.prototype = new EventDispatcher();

	p.EventDispatcher_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.EventDispatcher_init();

		this._x = 0;
		this._y = 0;
	};

	/*
	Update the game object
	*/
	p.update = function(delta){
		// TODO update the game object position
	};

	/*
	
	*/
	p.draw = function(){
		
	};

	Object.defineProperty(p, "x", {
		get: function(){
			return this._x;
		},
		set: function(x){
			this._x = x;
		}
	});

	Object.defineProperty(p, "y", {
		get: function(){
			return this._y;
		},
		set: function(y){
			this._y = y;
		}
	});

	window.GameObject = GameObject;
}(window));