(function(window){
	window.nextPowerOf2 = function(v){
		v |= v >> 1;
		v |= v >> 2;
		v |= v >> 4;
		v |= v >> 16;
		return v+1;
	};

	window.isPowerOf2 = function(v){
		return (v>0) && (v & (v-1)) === 0;
	};

	window.trace = function(){
		if(arguments.length == 1)
			console.log(arguments[0]);
		else{
			var text = arguments[0] + ', ';
			for(var i=1; i<arguments.length; ++i){
				text += arguments[i];
			}
			console.log(text);
		}
	};
}(window));