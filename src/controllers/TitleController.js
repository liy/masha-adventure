(function(window){
	function TitleController(){
		var self = this;
		
		this.init = function(view){
			// super.init
			TitleController.prototype.init(view);
			
			this.view.onClick = function(e){
				self.fadeOut(adventure.goGame);
			};
		};
		
		this.fadeIn = function(completeFunc){
			this.view.resize(adventure.stage.canvas.width, adventure.stage.canvas.height);
			
			TweenLite.to(this.view, 1, {alpha:1, onComplete:completeFunc});
			
			switches.addListener("switch press", switchDownHandler);
		}
		
		function switchDownHandler(e){
			switches.removeListener("switch press", switchDownHandler)
			self.fadeOut(adventure.goGame);
		};
	};
	TitleController.prototype = new Controller;
	
	window.titleController = new TitleController();
}(window));