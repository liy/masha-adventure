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
		var interval = 1000/fps;
		setInterval(mainloop, interval);

		container = new Container();
		container.x = 100;
		container.y = 100;
		container.radian = Math.PI/6;
		container.scaleX = container.scaleY = 2/3;
		container.name = "Sub Container";
		stage.addChild(container);


		bmp = new Bitmap('img/rails.png');
		bmp.name = "bmp";
		bmp.anchorX = 25;
		bmp.anchorY = 32;
		bmp.x = 0;
		bmp.y = 0;
		// bmp.scaleY = 1/2;
		// bmp.radian = Math.PI/4;
		container.addChild(bmp);

		for(var i=0; i<50; ++i){
			var b = new Bitmap('img/rails.png');
			b.x = b.tx = 50//Math.random()*300//50;
			b.y = b.ty = 64//Math.random()*300//64;
			b.scaleX = b.scaleY = Math.random() * 0.8 + 0.2;
			b.dm = Math.random()*10 + 5;
			b.dr = 0.05*Math.random() - 0.03;
			movingBmps.push(b);
			container.addChild(b);
		}

		canvas.addEventListener('click', bind(this, function(e){
			console.log("Mouse click: " + e.clientX + "," + e.clientY);

			var localPos = container.globalToLocal(new Vec2(e.clientX, e.clientY));
			// var localPos = new Vec2(e.clientX, e.clientY);
			bmp.x = localPos.x;
			bmp.y = localPos.y;

			var globalPos = container.localToGlobal(new Vec2(bmp.x, bmp.y));
			console.log(globalPos.toString());

		}, false));

		// enlargeComplete();
	};

	function shrinkComplete(){
		TweenLite.to(bmp, 1, {scaleX:1, onComplete:enlargeComplete});
	}

	function enlargeComplete(){
		TweenLite.to(bmp, 1, {scaleX:2, onComplete:shrinkComplete});
	}

	function mainloop(){
		var ctx = stage.context;
		var i;

		// bmp.radian += 0.1;
		// container.radian -= 0.1

		for(i=0; i<movingBmps.length; ++i){
			if(Math.abs(movingBmps[i].tx - movingBmps[i].x) < 0.3 && Math.abs(movingBmps[i].ty - movingBmps[i].y) < 0.3){
				movingBmps[i].tx = Math.random()*600 * Math.random();
				movingBmps[i].ty = Math.random()*400 * Math.random();
			}
			else{
				movingBmps[i].x += (movingBmps[i].tx - movingBmps[i].x)/movingBmps[i].dm;
				movingBmps[i].y += (movingBmps[i].ty - movingBmps[i].y)/movingBmps[i].dm;
			}
			movingBmps[i].radian += movingBmps[i].dr;
		}
		
		stage.draw();

		// for(i=0; i<movingBmps.length; ++i){
		// 	ctx.save();                  // Save the current state
		// 	ctx.fillStyle = '#00FFFF';       // Make changes to the settings
		// 	ctx.globalAlpha = 0.8;
		// 	// aabb = movingBmps[i].getAABB(this.stage);
		// 	aabb = movingBmps[i].aabb;
		// 	aabb = aabb.transform(container.matrix);
		// 	ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		// 	ctx.restore();
		// }


		// console.log(container.height);

		// container
		ctx.save();		// Save the current state
		ctx.fillStyle = '#FF0000';		// Make changes to the settings
		ctx.globalAlpha = 0.2;
		var aabb = container.aabb;
		ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		ctx.restore();

		// bitmap 
		ctx.save();		// Save the current state
		ctx.fillStyle = '#00FF00';		// Make changes to the settings
		ctx.globalAlpha = 0.8;
		// var aabb = bmp.getAABB(this.stage);
		var aabb = bmp.aabb.clone();
		aabb.transform(container.matrix);
		ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		ctx.restore();
	}
	
	this.camera = new Camera();
	this.camera.init(canvas.width, canvas.height, 0.5, 0.7);
};