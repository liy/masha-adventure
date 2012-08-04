/*
ImageLoader
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function ImageLoader(){
		this.image = new Image();
	}
	var p = ImageLoader.prototype = new EventDispatcher();

	/*
	
	*/
	p.load = function(src){
		console.log('load');
		this.image.onload = bind(this, function(){
			console.log('image loader loaded');
			this.dispatchEvent(new Event(Event.COMPLETE));
		});
		this.image.src = src;
	};

	window.ImageLoader = ImageLoader;
}(window));

// (function(){
// 	function Main(){
// 		this.loader = new ImageLoader();
// 		this.loader.addListener(Event.COMPLETE, bind(this, this.loadedHandler));
// 		this.loader.load('img/somacruz_run_spritesheet.png');
// 	}
// 	var p = Main.prototype;

// 	/*
	
// 	*/
// 	p.loadedHandler = function(e){
// 		this.loader.removeListener(Event.COMPLETE, bind(this, this.loadedHandler));
// 		console.log(this.loader._listeners.length);
// 	};

// 	var main = new Main();
// }());