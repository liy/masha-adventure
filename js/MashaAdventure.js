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
		var fps = 60;
		var interval = 1000/60
		setInterval(mainloop, interval)

		bigContainer = new Container();
		bigContainer.name = "BigContainer";
		bigContainer.x = 50;
		bigContainer.y = 50;
		stage.addChild(bigContainer);

		container = new Container();
		container.name = "Sub Container";
		bigContainer.addChild(container);


		bmp = new Bitmap('img/rails.png');
		bmp.anchorX = 25;
		bmp.anchorY = 32;
		container.addChild(bmp);
		bmp.radian = Math.PI/4;

		for(var i=0; i<1000; ++i){
			var b = new Bitmap('img/rails.png');
			if(Math.random() < 0.8){
				b.anchorX = 25;
				b.anchorY = 32;
			}
			b.scaleX = b.scaleY = 0.2;
			b.dr = Math.random()*0.2;
			b.x = b.tx = Math.random()*500;
			b.y = b.ty = Math.random()*300;
			b.dm = Math.random()*10 + 5;
			movingBmps.push(b);
			container.addChild(b);
		}

		canvas.addEventListener('click', bind(this, function(e){
	        console.log("Mouse click: " + e.clientX + "," + e.clientY);

	        // var invert = bigContainer.concatedMatrix.clone().invert();
	        // var clickPos = invert.transform(new Vec2(e.clientX, e.clientY));
	        var clickPos = bigContainer.getGlobalVec2(new Vec2(e.clientX, e.clientY));
	        console.log(clickPos.x, clickPos.y);
	        bmp.x = clickPos.x;
	        bmp.y = clickPos.y;

	    }, false));

		enlargeComplete();
	};

	function shrinkComplete(){
		TweenLite.to(bmp, 1, {scaleX:1, onComplete:enlargeComplete})
	}

	function enlargeComplete(){
		TweenLite.to(bmp, 1, {scaleX:2, onComplete:shrinkComplete})
	}

	function mainloop(){
		var ctx = stage.context;

		for(var i=0; i<movingBmps.length; ++i){
			if(Math.abs(movingBmps[i].tx - movingBmps[i].x) < 0.3 && Math.abs(movingBmps[i].ty - movingBmps[i].y) < 0.3){
				movingBmps[i].tx = Math.random()*500*Math.random();
				movingBmps[i].ty = Math.random()*300*Math.random();
			}
			else{
				movingBmps[i].x += (movingBmps[i].tx - movingBmps[i].x)/movingBmps[i].dm;
				movingBmps[i].y += (movingBmps[i].ty - movingBmps[i].y)/movingBmps[i].dm;
			}
			movingBmps[i].radian += movingBmps[i].dr;
		}

		bmp.radian += 0.2

		stage.draw();

		// for(var i=0; i<movingBmps.length; ++i){
		// 	ctx.save();                  // Save the current state  
		// 	ctx.fillStyle = '#00FFFF'       // Make changes to the settings 
		// 	ctx.globalAlpha = 0.3;
		// 	aabb = movingBmps[i].aabb;
		// 	ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// 	ctx.restore();
		// }

		
		// ctx.setTransform(1, 0, 0, 1, 0, 0);
		// ctx.save();                  // Save the current state  
		// ctx.fillStyle = '#FF0000'       // Make changes to the settings 
		// ctx.globalAlpha = 0.5;
		// var aabb = container.aabb;
		// ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// ctx.restore();

		// ctx.save();                  // Save the current state  
		// ctx.fillStyle = '#00FF00'       // Make changes to the settings 
		// ctx.globalAlpha = 0.3;
		// aabb = bmp.aabb;
		// ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// ctx.restore();

		// console.log(bmp.aabb)
	}
	
	this.camera = new Camera();
	this.camera.init(canvas.width, canvas.height, 0.5, 0.7);
};