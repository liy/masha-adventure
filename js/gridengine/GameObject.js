(function(window){
	function GameObject(){
		this._x = 0;
		this._y = 0;	
	}
	var p = GameObject.prototype;

	Object.defineProperty(p, "x", {
		get: function(){
			return this._x;
		},
		set: function(x){
			this._x = x;
		}
	})

	Object.defineProperty(p, "y", {
		get: function(){
			return this._y;
		},
		set: function(y){
			this._y = y;
		}
	})

	window.GameObject = GameObject;
}(window))