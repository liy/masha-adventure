/*
EventDispatcher
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function EventDispatcher(){
		this._listeners = [];
	}
	var p = EventDispatcher.prototype;
	
	p.addListener = function(type, func){
		var listener = Object.create(null);
		listener.type = type;
		listener.func = func;
		this._listeners.push(listener);

		console.log("added: " + listener.type);
	};
	
	p.removeListener = function(type, func){
		for(var i in this._listeners){
			if(this._listeners[i].type == type && func == this._listeners[i].func){
				delete this._listeners[i];

				console.log("remvoed: " + this._listeners[i]);
				return;
			}
		}
	};
	
	p.dispatchEvent = function(event){
		console.log(this._listeners.length);

		for(var i in this._listeners){
			if(this._listeners[i].type == event.type){
				this._listeners[i].func(event);
			}
		}
	};

	window.EventDispatcher = EventDispatcher;

	function Event(type){
		this.type = type;
	}
	window.Event = Event;
}(window));