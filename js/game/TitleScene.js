/*
TitleScene
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function TitleScene(){
		this.init();
	}
	var p = TitleScene.prototype = new Scene();

	p.Scene_init = p.init;
	/*
	
	*/
	p.init = function(){
		this.Scene_init();

		this.addListener('scene.fadeIn.complete', this.fadeInCompleteHandler);

		var paw = new Bitmap();
		paw.alpha = 0.5;
		this.addChild(paw);
		paw.load('image/paw.png');

		var bmp = new Bitmap();
		bmp.alpha = 1;
		this.addChild(bmp);
		bmp.load('img/texture.png');

	};

	/*
	
	*/
	p.fadeInCompleteHandler = function(){
		console.log('fade in complete');
	};

	window.TitleScene = TitleScene;
}(window));