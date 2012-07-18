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

		var paw = new Bitmap('img/paw.png');
		paw.alpha = 0.5;
		this.addChild(paw);

		var bmp = new Bitmap('img/texture.png');
		bmp.alpha = 1;
		this.addChild(bmp);


	};

	/*
	
	*/
	p.fadeInCompleteHandler = function(){
		console.log('fade in complete');
	};

	window.TitleScene = TitleScene;
}(window));