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
	function SpriteSheet(data){
		this.init(data);
	}
	var p = SpriteSheet.prototype = new EventDispatcher();

	p._images = [];

	/*
	Contains frames information.
	*/
	p._frames = [];

	/*
	animation information
	*/
	p._animations = [];

	/*
	*/
	p._offsetX = 0;
	
	/*
	*/
	p._offsetY = 0;

	/*
	Whether the SpriteSheet finishes all the images loading or not
	*/
	p.complete = true;

	/*
	data = {
		images: [image1, 'path/to/image2.png'],

		// Frames data, simple way.
		// ***** May be it is safe to treat offsetX and offsetY as offset? In this case, we can trim the frames. *****
		frames: {
			width: 64,
			height: 64,
			count: 20,
			offsetX: 32,
			offsetY:64
		},

		//OR, the complex way:
		frames: [
			// x, y, width, height, image index, offsetX, offsetY.
			[0, 0, 64, 64, 0, 32, 64],
			[64, 0, 96, 64, 0]
		],
		
		// simple animation definitions. Define a consecutive range of frames.
		// also optionally define a "next" animation name for sequencing.
		// setting next to false makes it pause when it reaches the end.
		animations: {
			// start, end, next animation, frequency. By default, frequency will be 1 if not provided.
			run: [0, 8],
			// jump starts from frame index 9 to 12, once it ends, 'run' animation will be played. Every jump frame will be played as 2 animation update cycles.
			jump: [9, 12, 'run', 2],
			// If only start frame index if provided, it will only play that start frame.
			stand: [13]
		},

		// the complex approach which specifies every frame in the animation by index.
		animations: {
			run: {
				frames: [1, 2, 3, 3, 2, 1]
			},
			jump: {
				frames: [1, 4, 5, 6, 1],
				next: "run",
				frequency: 2
			},
			stand: {
				frames: [7]
			}
		},

		// the above two approaches can be combined, you can also use a single frame definition:
		animations: {
			run: [0, 8, true, 2],
			jump: {
				frames: [8, 9, 10, 9, 8],
				next: "run",
				frequency: 2
			},
			stand: 7
		}

	}
	*/
	p.init = function(data){
		if(data == null)
			return;

		var len;
		var i;

		// extract images information
		if(data.images && (len = data.images.length) > 0){
			for(i=0; i<len; ++i){
				var image = data.images[i];
				// if image actually is a url string, a image object must be construct.
				if(typeof image === 'string'){
					image = new Image();
					image.src = data.images[i];
				}
				this._images[i] = image;

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
			/*
			//OR, the complex way:
			frames: [
				// x, y, width, height, image index, offsetX, offsetY.
				[0, 0, 64, 64, 0, 32, 64],
				[64, 0, 96, 64, 0]
			],
			*/
			len = data.frames.length;
			for(i=0; i<len; ++i){
				var info = data.frames[i];
				this._frames[i] = {
					// This is the image index of the frame, by default if it is not provided the image index will be 0.
					image: this._images[info[4] ? info[4] : 0],
					// Define the sub image this frame uses: x, y, width and height.
					rect: new Rect(info[0], info[1], info[2], info[3]),
					// In EaselJS documentation, it is treated as registration point, but we can safely use it as an offset of the top left point of a frame.
					// They can be used for identify the real frame position if the frame is trimmed.
					offsetX: info[5] || 0,
					offsetY: info[6] || 0
				};
			}
		}
		else{
			/*
			// Frames data, simple way. If every frame has same property, we can use simple definition.
			frames: {
					width: 64,
					height: 64,
					count: 20,
					offsetX: 32,
					offsetY:64
			}
			*/
			this._offsetX = data.frames.offsetX || 0;
			this._offsetY = data.frames.offsetY || 0;
			// TODO: easelJS has calculate frames function call, not sure what is that.
			this._calculateFrames(data.frames.width, data.frames.height);
		}
		
		// extract animations information
		if(data.animations != null){
			this._data = Object.create(null);

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
					animation.next = aniDef[2];
					animation.frames = [];
					for(i=aniDef[0]; i<aniDef[1]; ++i){
						animation.frames.push(i);
					}
				}
				else{ // complex
					animation.frequency = aniDef.frequency;
					animation.next = aniDef.next;
					animation.frames = !isNaN(aniDef.frames) ? [aniDef.frames] : aniDef.frames.slice(0);
				}

				// TODO: clean up the check
				// animation.next = (animation.frames.length < 2 || animation.next === false) ? null : (animation.next == null || animation.next === true) ? name : animation.next;
				if(animation.next === false)
					animation.next = null;
				else if(animation.next == null || animation.next === true){
					animation.next = name;
				}
				else{
					animation.next = animation.next;
				}
				if(!animation.frequency)
					animation.frequency = 1;

				this._animations.push(name);
				this._data[name] = animation;
			}
		}
	};

	/*
	Get number of frames of an animation. If no animation name provided, it returns total number of frames in the sprite sheet.
	*/
	p.getNumFrames = function(name){
		if (name == null)
			return this._frames ? this._frames.length : this._numFrames;
		else{
			var data = this._data[name];
			if (data == null)
				return 0;
			else
				return data.frames.length;
		}
	};

	/*
	
	*/
	p.getAnimations = function(){
		return this._animations.concat();
	};

	/*
	Get the animation.
	*/
	p.getAnimation = function(name){
		return this._data[name];
	};

	/*
	
	*/
	p.getFrame = function(frameIndex){
		if (this.complete && this._frames && (frame=this._frames[frameIndex]))
			return frame;
		return null;
	};

	/*
	Clone
	*/
	p.clone = function(){
		var ss = new SpriteSheet();
		ss.complete = this.complete;
		ss._animations = this._animations;
		ss._frames = this._frames;
		ss._images = this._images;
		ss._data = this._data;
		ss._numFrames = this._numFrames;

		return ss;
	};

	/*
	
	*/
	p.imageLoadHandler = function(){
		// TODO: handle loaded image.
		this.complete = true;
	};

	p._calculateFrames = function(frameWidth, frameHeight) {
		if (this._frames || frameWidth == 0) 
			return;

		this._frames = [];
		var ttlFrames = 0;
		var fw = frameWidth;
		var fh = frameHeight;
		for (var i=0,imgs = this._images; i<imgs.length; i++) {
			var img = imgs[i];
			var cols = (img.width+1)/fw|0;
			var rows = (img.height+1)/fh|0;
			var ttl = this._numFrames>0 ? Math.min(this._numFrames-ttlFrames,cols*rows) : cols*rows;
			for (var j=0;j<ttl;j++) {
				this._frames.push({image:img, rect:new ns.Rectangle(j%cols*fw,(j/cols|0)*fh,fw,fh), offsetX:this._offsetX, offsetY:this._offsetY });
			}
			ttlFrames += ttl;
		}
		this._numFrames = ttlFrames;
	}

	window.SpriteSheet = SpriteSheet;
}(window));