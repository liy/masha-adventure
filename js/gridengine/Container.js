(function(window){
	
	function Container(){
		this.init();
	}
	var p = Container.prototype = new DisplayObject();

	p.DisplayObject_init = p.init;
	p.init = function(){
		this.DisplayObject_init();
		this._children = [];
	};

	/*
	Draw the Container onto the specific Canvas2D context.
	*/
	p.draw = function(ctx){
		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();

		ctx.globalAlpha *= this.alpha;

		// 2d affine transform
		ctx.transform(this._m.a,  this._m.b, this._m.c, this._m.d, this._m.tx+0.5|0, this._m.ty+0.5|0);
		// ctx.transform(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);
		var len = this._children.length;
		for(var i=0; i<len; ++i){
			this._children[i].draw(ctx);
		}

		ctx.restore();
	};

	/*
	Return the number of children in this Container
	*/
	Object.defineProperty(p, "numChildren", {
		get: function(){
			return this._children.length;
		}
	});

	/*
	Add a DisplayObject into this Container.
	*/
	p.addChild = function(displayObject){
		// first we need to remove it from its old Container.
		if(displayObject.parent != null){
			displayObject.parent.removeChild(displayObject);
		}

		// Add the DisplayObject to this Container's children list.
		this._children.push(displayObject);
		displayObject.parent = this;

		// bounding box might be changed
		this.dirtyAABB = true;
	};

	/*
	Remove a DisplayObject from the Container.
	*/
	p.removeChild = function(displayObject){
		removeChildAt(this._children.indexOf(displayObject));
	};

	/*
	Remove a DisplayObject indexed by the parameter. If index is out of bound, null is returned.
	*/
	p.removeChildAt = function(index){
		if(index < 0 || index > this._children.length-1)
			return null;

		var removed = this._children[index];
		delete this._children[index];
		removed.parent = null;
		
		// it is now off the stage.
		removed.setStage = null;

		// bounding box might be changed
		this.dirtyAABB = true;

		return removed;
	};

	/*
	Whether the Container contains the child.
	*/
	p.contains = function(displayObject){
		return this._children.indexOf(displayObject) != -1;
	};

	/*
	Compute an AABB for this Container.
	*/
	Object.defineProperty(p, "aabb", {
		get: function(){
			// Only calculate AABB when it is dirty.
			if(this._aabb.isDirty){
				// reset AABB so it is ready for perform merging.
				this._aabb.reset();

				// Scan all the children, merge their AABBs into this Container's AABB, notice that the Container's matrix is passed with the merging.
				// That is because we need to merge the child's AABB after performed its Container's transformation, in this case, the Container's AABB
				// will be tightly wraps all its children's AABB.
				var len = this._children.length;
				for(var i=0; i<len; ++i){
					this._aabb.merge(this._children[i].aabb, this.matrix);
				}
				// console.log("perform container AABB transform");

				// It is very computation heavy to compute an AABB for Container. Once an AABB is calculated once, it will be set to clean, no need to calculate again.
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

	/*
	Make this Container on or off stage. Of course, all its children will be set as well.
	*/
	p.setStage = function(stage){
		this.stage = stage;
		for(var i=0; i<this._children.length; ++i){
			this._children[i].setStage(stage);
		}
	};

	window.Container = Container;
}(window));