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

	// cross browser requestAnimationFrame function
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
    })();

}(window));