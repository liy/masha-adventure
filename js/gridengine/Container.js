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
					// this._aabb = this._children[0].aabb.clone().transform(this.matrix);
					// // this._aabb = this._children[0].getAABB(this.parent);
					// // this._aabb = this._children[0].getAABB(this).transformBy(this.matrix);


					// for(var i=1; i<this._children.length; ++i){
					// 	this._aabb.merge(this._children[i].aabb.clone().transform(this.matrix));
					// 	// this._aabb.merge(this._children[i].getAABB(this.parent));
					// 	// this._aabb.merge(this._children[i].getAABB(this).transformBy(this.matrix));
					// }

					this._aabb = this._children[0].aabb;
					this._aabb.matrix = this._aabb.matrix.multiplyLeft(this.matrix);
					var len = this.numChildren;
					for(var i=1; i<len; ++i){
						var aabb = this._children[i].aabb;
						aabb.matrix = aabb.matrix.multiplyLeft(this.matrix);

						this._aabb.merge(aabb);
					}
				}
				this.dirtyAABB = false;
			}
			return this._aabb;
		}
	});

	/*
	Get an AABB in the targeted corodinate system
	*/
	p.getAABB = function(targetCoordinate){
		var aabb = new AABB();
		if(this._children.length !== 0){
			aabb = this._children[0].getAABB(targetCoordinate);
			for (var i = 1; i < this._children.length; i++){
				aabb.merge(this._children[i].getAABB(targetCoordinate));
			}
			// aabb.transformBy(this.matrix);
		}
		return aabb;
	};

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