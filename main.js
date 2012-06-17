window.onload = function(){
	stage = new Stage(document.getElementById('canvas'));
	
	var gameView = new View();
	stage.addChild(gameView);
	gameView.fadeIn();
	
	var logo = new SimpleButton("assets/images/rails.png");
	logo.regX = logo.width*0.5;
	logo.regY = logo.height*0.5;
	gameView.addChild(logo);
	
	var lots = new Array();
	for(var i=0; i<4; ++i){
		var btn = new SimpleButton('assets/images/rails.png');
		btn.regX = logo.width*0.5;
		btn.regY = logo.height*0.5;
		btn.x = btn.tx = Math.random() * stage.canvas.width;
		btn.y = btn.ty = Math.random() * stage.canvas.height;
		lots.push(btn);
		
		scanning.scanList.add(btn);
		
		gameView.addChild(btn);
	}
	scanning.autoScan = false;

	stage.update();
	
	Ticker.setFPS(30);
	Ticker.addListener(this);
	
	
	
	function tick(){
		// logo.x += (stage.mouseX - logo.x)*0.2;
		// logo.y += (stage.mouseY - logo.y)*0.2;
		
		// for(var i=0; i<lots.length; ++i){
		// 	// console.log(lots)
		// 	var btn = lots[i];
		// 	if(Math.abs(btn.tx - btn.x) <= 1 && Math.abs(btn.ty - btn.y) <= 1){
		// 		btn.tx = Math.random() * stage.canvas.width;
		// 		btn.ty = Math.random() * stage.canvas.height;
		// 	}
		// 	else{
		// 		btn.x += (btn.tx - btn.x)*0.2;
		// 		btn.y += (btn.ty - btn.y)*0.2;
		// 	}
		// }
		
		stage.update();
	}
	
	window.tick = tick;
	
	
	switches.addListener('switch press', function(e){
		scanning.process(e.keyCode);
	});
};