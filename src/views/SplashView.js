(function(window){
	function SplashView(){
		this.paw = new Bitmap("assets/images/rails.png");
		this.addChild(this.paw);
		
		this.init();
	};
	var p = SplashView.prototype = new View;
	
	p.resize = function(w, h){
		this.paw.x = (w - this.paw.image.width)*0.5;
		this.paw.y = (h - this.paw.image.height)*0.5;	
	}
	
	window.SplashView = SplashView;
}(window));