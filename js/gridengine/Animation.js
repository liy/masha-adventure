/*
* BitmapAnimation
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
(function(window){
	function Animation(spriteSheet){
		this.init(spriteSheet);
	}
	var p = Animation.prototype = new DisplayObject();

	p.DisplayObject_init = p.init;

	/*
	
	*/
	p.init = function(spriteSheet){
		this.DisplayObject_init();

		// the sprite sheet
		this.spriteSheet = spriteSheet;
		
		// Whether this animation is paused or not.
		this.paused = true;

		// Index points to the frame in the context of the total number of frames in the sprite sheet.
		this.currentFrameIndex = -1;

		// Index points to the frame in the context of the frames in the current animation.
		this._animationFrameIndex = -1;

		this._animation = null;

		// advance counter.
		this._advanceCounter = 0;
	};

	/*
	
	*/
	p.play = function(){
		this.paused = false;
	};

	/*
	
	*/
	p.gotoAndPlay = function(indexOrName){
		this.paused = false;
		this.goto(indexOrName);
	};

	/*
	
	*/
	p.gotoAndStop = function(indexOrName){
		this.paused = true;
		this.goto(indexOrName);
	};

	/*
	
	*/
	p.draw = function(ctx){
		// update animation
		this.updateAnimation();

		// update matrix, getting ready for apply to the context.
		this.updateMatrix();

		// push the current matrix state to the stack
		ctx.save();
		
		ctx.globalAlpha *= this.alpha;

		// 2d affine transform
		ctx.transform(this._m.a,  this._m.b, this._m.c, this._m.d, this._m.tx+0.5|0, this._m.ty+0.5|0);

		var frame = this.spriteSheet.getFrame(this.currentFrameIndex);
		ctx.drawImage(frame.image, frame.rect.x, frame.rect.y, frame.rect.width, frame.rect.height, -frame.offsetX, -frame.offsetY, frame.rect.width, frame.rect.height);

		// pop the last saved matrix state, assign to the context.
		ctx.restore();
	};

	/*
	
	*/
	p.goto = function(indexOrName){
		// animation name
		if(isNaN(indexOrName)){
			// go to animation
			var animation = this.spriteSheet.getAnimation(indexOrName);
			if(animation){
				this.currentAnimation = animation;
				this.currentAnimationName = indexOrName;
				// go to a new animation, start from the beginning
				this._animationFrameIndex = 0;
			}
		}
		// frame index
		else{
			this.currentFrameIndex = indexOrName;
			this.currentAnimation = null;
		}
	};

	/*
	
	*/
	p.updateAnimation = function(){
		if(!this.paused){
			if(this._animation)
				this._animationFrameIndex++;
			else
				this.currentFrameIndex++;

			this._validateFrame();
		}
	};

	/*
	
	*/
	p._validateFrame = function(){

	};

	window.Animation = Animation;
}(window));