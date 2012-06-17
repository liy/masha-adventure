(function(window){
	function SimpleButton(imageOrUri) {
		// initialize the Container. It must be called to ensures Container functional correctly.
		this.initialize();
		
		this.bitmap = new Bitmap(imageOrUri);
		
		var g = new Graphics();
		g.setStrokeStyle(10);
		g.beginStroke(Graphics.getRGB(255,0,255));
		g.drawRect(0, 0, this.width, this.height);
		
		this.scanBox = new Shape(g);
		this.scanBox.visible = false;
		this.addChild(this.scanBox);
		
		this.addChild(this.bitmap);
	};
	var p = SimpleButton.prototype = new Container;
	
	p.onScanSelect = function(e){
		console.log("click handler: " + e);
	};
	
	p.onScanOver = function(e){
		console.log('scan over: ' + this);
		this.scanBox.visible = true;
	};
	
	p.onScanOut = function(e){
		console.log('scan out');
		this.scanBox.visible = false;
	};
	
	Object.defineProperty(p, "width", {
		get: function(){
			return this.bitmap.image.width;
		}
	});
	
	Object.defineProperty(p, "height", {
		get: function(){
			return this.bitmap.image.height;
		}
	});
	
	window.SimpleButton = SimpleButton;
}(window));