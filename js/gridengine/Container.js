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
			if(this._aabb.isDirty){
				// simply merge all the AABB will produce the container's AABB.
				if(this._children.length !== 0){
					// clear the original container's AABB, ready to merge all the AABBs of the children.
					this._aabb.reset();
					// scan all the children, and merge their AABBs. The corresponding AABB is transformed by the container's matrix before it is 
					// merged.
					var len = this.numChildren;
					for(var i=0; i<len; ++i){
						this._aabb.merge(this._children[i].aabb, this.matrix);
					}
				}

				this.dirtyAABB = false;
			}
			return this._aabb;
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "width", {
		get: function(){
			return this.aabb.width;
		},
		set: function(width){
			var aabb = this.aabb;
			if(aabb.width !== 0){
				var scaleX = width/aabb.width;
				this.scaleX = scaleX;
			}
		}
	});

	/*
	Getter and setter
	*/
	Object.defineProperty(p, "height", {
		get: function(){
			return this.aabb.height;
		},
		set: function(height){
			var aabb = this.aabb;
			if(aabb.height !== 0){
				var scaleY = height/aabb.height;
				this.scaleY = scaleY;
			}
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