(function(window){
	function TitleView(){
		TitleView.prototype.init();
		
		var g = new Graphics();
		this.codeCatcher = new Shape(g);
		this.addChild(this.codeCatcher)
		
		this.startBtn = new SimpleButton('assets/images/paw.png');
		this.promptText = new Text("Press to start", "30px Helvetica", '#000000');
		this.addChild(this.startBtn);
		this.addChild(this.promptText);
	};
	var p = TitleView.prototype = new View;
	
	p.resize = function(w, h){
		this.startBtn.x = (w - this.startBtn.width)*0.5;
		this.startBtn.y = (h - this.startBtn.height)*0.5 - this.promptText.getMeasuredLineHeight();
		
		this.promptText.x = (w - this.promptText.getMeasuredWidth())*0.5;
		this.promptText.y = this.startBtn.y + this.startBtn.height + this.promptText.getMeasuredLineHeight() + 10;
		
		var g = this.codeCatcher.graphics;
		g.setStrokeStyle(10);
		g.beginFill(Graphics.getRGB(240,240,240));
		g.drawRect(0, 0, w, h);
	}
	
	window.TitleView = TitleView;
}(window));