/**
 * Author: Zhengyi Li
 */

window.onload = function(){

	var canvas = document.getElementById('root-canvas');
	var stage = new Stage(canvas);

	var bmp;
	var container;
	var bigContainer;

	var movingBmps = [];

	this.adventure = new function(){
		// var fps = 5;
		// var interval = 1000/60;
		setInterval(mainloop, 1000);

		container = new Container();
		container.x = 200;
		container.y = 200;
		container.radian = -Math.PI/4;
		container.name = "Sub Container";
		stage.addChild(container);


		bmp = new Bitmap('img/rails.png');
		//bmp.anchorX = 25;
		//bmp.anchorY = 32;
		bmp.x = 0;
		bmp.y = 0;
		container.addChild(bmp);

		for(var i=0; i<1; ++i){
			var b = new Bitmap('img/rails.png');
			b.x = 50;
			b.y = 64;
			//b.dm = Math.random()*10 + 5;
			movingBmps.push(b);
			container.addChild(b);
		}

		// canvas.addEventListener('click', bind(this, function(e){
		// 	console.log("Mouse click: " + e.clientX + "," + e.clientY);


		// 	// var invert = bigContainer.concatedMatrix.clone().invert();
		// 	// var clickPos = invert.transform(new Vec2(e.clientX, e.clientY));
		// 	//var clickPos = bigContainer.getGlobalVec2(new Vec2(e.clientX, e.clientY));
		// 	//console.log(clickPos.x, clickPos.y);
		// 	//bmp.x = clickPos.x;
		// 	//bmp.y = clickPos.y;

		// }, false));

		//enlargeComplete();
	};

	function shrinkComplete(){
		TweenLite.to(bmp, 1, {scaleX:1, onComplete:enlargeComplete});
	}

	function enlargeComplete(){
		TweenLite.to(bmp, 1, {scaleX:2, onComplete:shrinkComplete});
	}

	function mainloop(){
		// container.scaleY = 1/2;

		var ctx = stage.context;
		var i;

		// for(i=0; i<movingBmps.length; ++i){
		// 	if(Math.abs(movingBmps[i].tx - movingBmps[i].x) < 0.3 && Math.abs(movingBmps[i].ty - movingBmps[i].y) < 0.3){
		// 		movingBmps[i].tx = Math.random()*500*Math.random() + 50;
		// 		movingBmps[i].ty = Math.random()*300*Math.random() + 50;
		// 	}
		// 	else{
		// 		movingBmps[i].x += (movingBmps[i].tx - movingBmps[i].x)/movingBmps[i].dm;
		// 		movingBmps[i].y += (movingBmps[i].ty - movingBmps[i].y)/movingBmps[i].dm;
		// 	}
		// 	movingBmps[i].radian += movingBmps[i].dr;
		// }

		//bmp.radian += 0.01;
		
		stage.draw();

		for(i=0; i<movingBmps.length; ++i){
			ctx.save();                  // Save the current state
			ctx.fillStyle = '#00FFFF';       // Make changes to the settings
			ctx.globalAlpha = 0.8;
			aabb = movingBmps[i].getAABB(this.stage);
			ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
			ctx.restore();
		}


		ctx.save();		// Save the current state
		ctx.fillStyle = '#FF0000';		// Make changes to the settings
		ctx.globalAlpha = 0.2;
		var aabb = container.getAABB(stage);
		ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		ctx.restore();
	}
	
	this.camera = new Camera();
	this.camera.init(canvas.width, canvas.height, 0.5, 0.7);
};