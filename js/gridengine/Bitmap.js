(function(window){
	function Bitmap(src){
		this.init(src);
	}
	var p = Bitmap.prototype = new DisplayObject();

	p.init = function(src){
		this.image = new Image();
		this.image.src = src;

		this.rect = new Rect();
	}

	p.draw = function(ctx){
		ctx.save();

		ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty)
		ctx.drawImage(this.image, 0, 0);

		ctx.restore();
	}

	window.Bitmap = Bitmap;
}(window))