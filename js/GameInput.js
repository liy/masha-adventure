define(['require', 'utils/bind'], function(){
	// game input simplify the process of enable and disable the the keyboard event.
	var gameInput = new function(){
		this.enabled = true;
		var _listeners = [];
		
		document.addEventListener("keydown", bind(this, keyboardHandler), false);
		document.addEventListener("keyup", bind(this, keyboardHandler), false);
				
		this.addListener = function(eventName, func){
			var listener = Object.create(null);
			listener.type = eventName;
			listener.func = func;
			_listeners.push(listener);
		}

		this.removeListener = function(eventName, func){
			for(var i in _listeners){
				if(_listeners[i].type == eventName && func == _listeners[i].func){
					delete _listeners[i];
					return;
				}
			}
		}

		this.dispatchEvent = function(event){
			for(var i in _listeners){
				if(_listeners[i].type == event.type){
					_listeners[i].func(event);
				}
			}
		}
	};
	var p = gameInput.prototype;
	
	function keyboardHandler(e){
		// console.log("keyboardHandler, enabled: " + this.enabled + " type: " + e.type);
		if(this.enabled){
			// stop arrow, space and tab's default brower action
			if((e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode == 9 || e.keyCode == 32)
				e.preventDefault();
			
			this.dispatchEvent(e)
		}
	};
	
	window.gameInput = gameInput;
});