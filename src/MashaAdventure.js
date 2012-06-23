window.onload = function(){
	this.adventure = new function(){
		this.stage = new Stage(document.getElementById('root-canvas'))
		
		this.init = function(){
			var scene = new Scene();
			this.stage.addChild(scene);

			Ticker.setFPS(60);
			Ticker.addListener(this);

			this.tick = function(){
				scene.update();
				this.stage.update();
			};

			this.stage.canvas.onblur = function(e){
				gameInput.enabled = false;
				switches.enabled = false;
			};

			this.stage.canvas.onfocus = function(e){
				gameInput.enabled = true;
				switches.enabled = true;
			};

			this.stage.canvas.focus();
		}
	};
	
	adventure.init();
};