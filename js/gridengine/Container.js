(function(window){
	
	function Container(){
		this.klass = "Container";
		this.init();
	}
	var p = Container.prototype = new DisplayObject();

	p.super_init = p.init;
	p.init = function(){
		this.super_init();
		this._children = [];
	};

	p.draw = function(ctx){
		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		// 2d affine transform
		ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);
		var len = this._children.length;
		for(var i=0; i<len; ++i){
			this._children[i].draw(ctx);
		}

		ctx.restore();
	};

	Object.defineProperty(p, "numChildren", {
		get: function(){
			return this._children.length;
		}
	});

	p.addChild = function(displayObject){
		this._children.push(displayObject);
		displayObject.parent = this;
		// bounding box might be changed
		this.dirtyAABB = true;
	};

	p.removeChild = function(displayObject){
		removeChildAt(this._children.indexOf(displayObject));
	};

	p.removeChildAt = function(index){
		if(index < 0 || index > this._children.length-1)
			return null;
		var removed = this._children[index];
		delete this._children[index];
		removed.parent = null;
		removed.setStage = null;

		// bounding box might be changed
		this.dirtyAABB = true;

		return removed;
	};

	Object.defineProperty(p, "aabb", {
		get: function(){
			if(this.dirtyAABB){
				if(this._children.length !== 0){
					this._aabb = this._children[0].aabb;
					for(var i=1; i<this._children.length; ++i){
						this._aabb.merge(this._children[i].aabb);
					}
					this.dirtyAABB = false;
				}
			}
			return this._aabb;
		}
	});

	p.setStage = function(stage){
		this.stage = stage;
		for(var i=0; i<this._children.length; ++i){
			this._children[i].setStage(stage);
		}
	};

	window.Container = Container;
}(window));