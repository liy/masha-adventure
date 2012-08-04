/*
EventDispatcher
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function EventDispatcher(){
		this.init();
	}
	var p = EventDispatcher.prototype;

	/*
	
	*/
	p.init = function(){
		this._listeners = [];
	};
	
	p.addListener = function(type, func){
		var listener = Object.create(null);
		listener.type = type;
		listener.func = func;
		this._listeners.push(listener);
	};
	
	p.removeListener = function(type, func){
		for(var i in this._listeners){
			// TODO: the function comparison needs more work, it
			if(this._listeners[i].type === type && func.toString() === this._listeners[i].func.toString()){
				this._listeners.splice(i, 1);
				return;
			}
		}
	};
	
	p.dispatchEvent = function(event){
		for(var i in this._listeners){
			if(this._listeners[i].type === event.type){
				this._listeners[i].func(event);
			}
		}
	};

	window.EventDispatcher = EventDispatcher;

	/*
	Base event.
	*/
	function Event(type){
		this.type = type;
	}
	
	Event.COMPLETE = 'event.complete';
	Event.ANIM_END = 'animation.end';

	window.Event = Event;
}(window));