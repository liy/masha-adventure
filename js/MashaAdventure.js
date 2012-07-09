/**
 * Author: Zhengyi Li
 */

window.onload = function(){

	var canvas = document.getElementById('root-canvas');
	var stage = new Stage(canvas);

	var bmp1;
	var bmp2;
	var bmp3;
	var container;
	var bigContainer;

	this.adventure = new function(){
		var fps = 60;
		var interval = 1000/60
		setInterval(mainloop, interval)

		bigContainer = new Container();
		bigContainer.x = 100;
		bigContainer.y = 100;
		stage.addChild(bigContainer);

		container = new Container();
		bigContainer.addChild(container);


		bmp1 = new Bitmap('img/rails.png');
		bmp1.anchorX = 25;
		bmp1.anchorY = 32;
		container.addChild(bmp1);

		bmp1.radian = Math.PI/4;

		bmp2 = new Bitmap('img/rails.png');
		bmp2.anchorX = 25;
		bmp2.anchorY = 32;
		container.addChild(bmp2);

		bmp2.radian = Math.PI/4;
		bmp2.x = 300;
		bmp2.y = 120;

		bmp3 = new Bitmap('img/rails.png');
		bmp3.x = 400;
		bmp3.y = 500;
		bmp3.anchorX = 25;
		bmp3.anchorY = 32;
		container.addChild(bmp3);

		// container.tx = 0;
		// container.ty = 0;
		canvas.addEventListener('click', bind(this, function(e){
	        var message = "Mouse click: " + e.clientX + "," + e.clientY;
	        bigContainer.x = e.clientX;
	        bigContainer.y = e.clientY;

	        console.log(message);
	    }, false));

		enlargeComplete();
	};

	function shrinkComplete(){
		TweenLite.to(bmp3, 1, {scaleX:1, onComplete:enlargeComplete})
	}

	function enlargeComplete(){
		TweenLite.to(bmp3, 1, {scaleX:2, onComplete:shrinkComplete})
	}

	function mainloop(){
		// container.x += (container.tx - container.x)/10;
		// container.y += (container.ty - container.y)/10;

		// console.log(bigContainer.matrix)
		stage.draw();

		bmp1.radian += 0.02;
		bmp3.radian -= 0.01;

		var ctx = stage.context;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.save();                  // Save the current state  
		ctx.fillStyle = '#FF0000'       // Make changes to the settings 
		ctx.globalAlpha = 0.5;
		var aabb = container.aabb;
		ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		ctx.restore();

		ctx.save();                  // Save the current state  
		ctx.fillStyle = '#00FF00'       // Make changes to the settings 
		ctx.globalAlpha = 0.3;
		aabb = bmp3.aabb;
		ctx.fillRect(aabb.lowerBound.x, aabb.lowerBound.y, aabb.upperBound.x - aabb.lowerBound.x, aabb.upperBound.y - aabb.lowerBound.y);
		ctx.restore();

		// console.log(bmp.aabb)
	}
	
	this.camera = new Camera();
	this.camera.init(canvas.width, canvas.height, 0.5, 0.7);
};