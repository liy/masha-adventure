window.onload = function(){
	switches.addListener('switch press', function(e){
		scanning.process(e.keyCode);
	});
		
	this.adventure = new function(){
		this.currentView = null;
		
		this.stage = new Stage(document.getElementById('mashaAdventureCanvas'));
		
		Ticker.setFPS(30);
		Ticker.addListener(this);
		
		// main game loop
		this.tick = function(){
			this.stage.update();
		};
		
		// splash
		splashController.init(new SplashView())
		this.goSplash = function(){
			if(adventure.currentView != null)
				adventure.stage.removeChild(this.currentView);
			
			console.log('go splash');
			
			var view = splashController.view;
			splashController.fadeIn();
			
			adventure.currentView = view;
			adventure.stage.addChild(view);
		};
		
		// title
		titleController.init(new TitleView())		
		this.goTitle = function(){
			if(adventure.currentView != null)
				adventure.stage.removeChild(this.currentView);
			
			console.log('go title');
			
			var view = titleController.view;
			titleController.fadeIn();
			
			adventure.currentView = view;
			adventure.stage.addChild(view);
		};
		
		// game
		gameController.init(new GameView());
		this.goGame = function(){
			if(adventure.currentView != null)
				adventure.stage.removeChild(this.currentView);
			
			console.log('go game');
			
			var view = gameController.view;
			gameController.fadeIn();
			
			adventure.currentView = view;
			adventure.stage.addChild(view);
		};
		
		// reward
		rewardController.init(new RewardView());
		this.goReward = function(){
			if(adventure.currentView != null)
				adventure.stage.removeChild(this.currentView);
			
			console.log('go reward');
			
			var view = rewardController.view;
			rewardController.fadeIn();
			
			adventure.currentView = view;
			adventure.stage.addChild(view);
		};
	};
	
	// by default display splash screen.
	adventure.goSplash();
	
	console.log('do we have: ' + window.adventure);
};