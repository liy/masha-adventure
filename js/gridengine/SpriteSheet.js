/*

* SpriteSheet, mimic EaselJS's SpriteSheet class
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
	p.images = [];

	/*
	Contains frames information.
	*/
	p.frames = [];

	/*
	animation information
	*/
	p.animations = [];

	/*
	Whether the SpriteSheet finishes all the images loading or not
	*/
	p.complete = true;

	function SpriteSheet(data){
		this.init(data);
	}
	var p = SpriteSheet.prototype = new EventDispatcher();

	/*
	
	*/
	p.init = function(data){
		if(data == null)
			return;

		var len;
		var arr;
		var i;

		// extract image information.
		if(data.images && (len = data.images.length) > 0){
			for(i=0; i<len; ++i){
				var image = data.image[i];
				// if image actually is a url string, a image object must be construct.
				if(typeof image === 'string'){
					image = new Image();
					image.src = data.images[i];
				}
				this.images[i] = image;

				// If the image is not loaded, load it!
				if(!image.complete){
					this.complete = false;
					image.onload = bind(this, this.imageLoadHandler);
				}
			}
		}

		// extract frames information:
		if(data.frames == null){
			// Do nothing.
		}
		else if(data.frames instanceof Array){
			len = data.frames.length;
			for(i=0; i<len; ++i){
				var info = this.frames[i];
				this.frames[i] = {
					// This is the image index of the frame
					image: this.images[info[4] ? info[4] : 0],
					// Describe the sub image this frame uses
					rect: new Rect(info[0], info[1], info[2], info[3]),
					// registration point.
					anchorX: info[5] || 0,
					anchorY: info[6] || 0
				};
			}
		}
		else{
			this.frameWidth = data.frames.width;
			this.frameHeight = data.frames.height;
			this.anchorX = data.frames.regX || 0;
			this.anchorY = data.frames.regY || 0;
			this.numFrames = data.frames.count;

			// TODO: easelJS has calculate frames function call, not sure what is that.
		}
		
		// extract animations information
		if(data.animations != null){
			this.data = Object.create(null);

			var name;
			for(name in data.animations){
				var animation = {
					name: name
				};
				var aniDef = data.animations[name];
				// single frame
				if(!isNaN(aniDef)){
					animation.frames = [aniDef];
				}
				else if(aniDef instanceof Array){ // simple
					animation.frequency = aniDef[3];
					animation.next = aniDef[3];
					animation.frames = [];
					for(i=aniDef[0]; i<aniDef[1]; ++i){
						animation.frames[i] = i;
					}
				}
				else{ // complex
					animation.frequency = aniDef.frequency;
					animation.next = aniDef.next;
					animation.frames = !isNaN(aniDef.frames) ? [aniDef.frames] : aniDef.frames.slice(0);
				}

				animation.next = (animation.frames.length < 2 || animation.next === false) ? null : (animation.next == null || animation.next === true) ? name : animation.next;
				if(!animation.frequency)
					animation.frequency = 1;
				this.animations.push(name);
				thid.data[name] = animation;
			}
		}
	};

	/*
	
	*/
	p.imageLoadHandler = function(){
		// TODO: handle loaded image.	
	};

	window.SpriteSheet = SpriteSheet;
}(window));