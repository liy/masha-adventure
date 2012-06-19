window.onload = function(){

	
	this.adventure = new function(){
		this.stage = new Stage(document.getElementById('root-canvas'))
		var scene = new Scene();
		this.stage.addChild(scene);
				
		Ticker.setFPS(30);
		Ticker.addListener(this);
		
		this.tick = function(){
			this.stage.update();
			scene.update();
		};
	};
	
	document.getElementById('root-canvas').onblur = function(e){
		console.log("on blur");
		enableArrowKeyPageScroll();
	}
	
	document.getElementById('root-canvas').onfocus = function(e){
		console.log("on focus");
		disableArrowKeyPageScroll();
	}
	document.getElementById('root-canvas').focus();	
	
	/*
		Stop arrow keys scrolling the page. Useful for game
	*/
	function disableArrowKeyPageScroll(){
		document.addEventListener("keydown", keyDownHandler, false);	
	};

	function enableArrowKeyPageScroll(){
		document.removeEventListener("keydown", keyDownHandler);
	}

	function keyDownHandler(e){
		if((e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode == 9 || e.keyCode == 32){
			e.preventDefault();
		}
	};
	
};