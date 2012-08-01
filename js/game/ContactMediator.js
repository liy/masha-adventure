/*
ContactMediator
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function ContactMediator(){
	}
	var p = ContactMediator.prototype;

	/*
	
	*/
	p.init = function(world){
		world.SetContactListener(this);
	};

	/*
	
	*/
	p.PreSolve = function(contact, oldManifol){
		var fixtureA = contact.GetFixtureA();
		if(fixtureA.PreSolve)
			fixtureA.PreSolve(contact, oldManifol);
		
		var fixtureB = contact.GetFixtureB();
		if(fixtureB.PreSolve)
			fixtureB.PreSolve(contact, oldManifol);
	};

	/*
	
	*/
	p.PostSolve = function(contact, impulse){
		var fixtureA = contact.GetFixtureA();
		if(fixtureA.PostSolve)
			fixtureA.PostSolve(contact, impulse);
		
		var fixtureB = contact.GetFixtureB();
		if(fixtureB.PostSolve)
			fixtureB.PostSolve(contact, impulse);
	};

	/*
	
	*/
	p.BeginContact = function(contact){
		var fixtureA = contact.GetFixtureA();
		if(fixtureA.BeginContact)
			fixtureA.BeginContact(contact);
		
		var fixtureB = contact.GetFixtureB();
		if(fixtureB.BeginContact)
			fixtureB.BeginContact(contact);
	};

	/*
	
	*/
	p.EndContact = function(contact){
		var fixtureA = contact.GetFixtureA();
		if(fixtureA.EndContact)
			fixtureA.EndContact(contact);
		
		var fixtureB = contact.GetFixtureB();
		if(fixtureB.EndContact)
			fixtureB.EndContact(contact);
	};
	window.contactMediator = new ContactMediator();
}(window));
