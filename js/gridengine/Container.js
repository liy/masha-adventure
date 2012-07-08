(function(window){
	
	function Container(){
		this._children = [];
	}
	var p = Container.prototype = new DisplayObject();

	p.draw = function(ctx){
		ctx.save();

		var len = this._children.length;
		for(var i=0; i<len; ++i){
			this._children[i].draw(ctx);
		}

		ctx.restore();
	}

	Object.defineProperty(p, "numChildren", {
		get: function(){
			// trace("numChildren: " + children)
			return this._children.length;
		}
	});

	p.addChild = function(displayObject){
		this._children.push(displayObject);
	}

	p.removeChild = function(displayObject){
		removeChildAt(this._children.indexOf(displayObject));
	}

	p.removeChildAt = function(index){
		if(index < 0 || index > this._children.length-1) 
			return null;
		var removed = this._children[index];
		delete this._children[index];

		removed.parent = null;
		return removed;
	}

	window.Container = Container;
}(window))