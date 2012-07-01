(function(window){
	function AssetData(){
		
	}
	
	AssetData.player = {
		images: ["img/texture.png", "img/somacruz_run_spritesheet.png", "img/somacruz/somacruz.png"],
		frames: [
			[0,0,17,31,0,8,31],
			[18,0,17,31,0,8,31],
			[36,0,17,31,0,8,31],
			
			[589,0,19,43,1,10,43],
			[609,0,19,43,1,10,43],
			[629,0,19,43,1,10,43],
			[649,0,19,43,1,10,43],
			[669,0,19,43,1,10,43],
			[689,0,19,43,1,10,43],
			[709,0,19,43,1,10,43],
			[729,0,19,43,1,10,43],
			
			[0,0,35,43,2,18,43],
			[35,0,35,43,2,18,43],
			[70,0,35,43,2,18,43],
			[105,0,35,43,2,18,43],
			[140,0,35,43,2,18,43],
			[175,0,35,43,2,18,43],
			[210,0,35,43,2,18,43],
			[245,0,35,43,2,18,43],
			[280,0,35,43,2,18,43],
			[315,0,35,43,2,18,43],
			[350,0,35,43,2,18,43],
			[385,0,35,43,2,18,43],
			[420,0,35,43,2,18,43],
			[455,0,35,43,2,18,43],
			[490,0,35,43,2,18,43],
			[525,0,35,43,2,18,43],
			
			[560,0,35,43,2,18,43],
			[595,0,35,43,2,18,43],
			[630,0,35,43,2,18,43]
		],
		animations: {
			walk: {
				frames: [0, 1, 2, 1],
				next: "walk",
				frequency: 10
			},
			stand: {
				frames: [3,4,5,6,7,8,9,10,9,8,7,6,5,4,3],
				next: "stand",
				frequency: 5
			},
			run:{
				frames: [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
				next: "run",
				frequency: 5
			},
			stopping: {
				frames:[27,28,29],
				next: "stand",
				frequency: 7
			}
		}
	};
	
	window.AssetData = AssetData;
}(window))