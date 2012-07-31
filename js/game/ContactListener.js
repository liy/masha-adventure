/*
ContactListener
@author Zhengyi Li
@email zhengyi.li@aircapsule.com
*/
(function(window){
	function ContactListener(){
		
	}
	var p = ContactListener.prototype;

	/*
	
	*/
	p.PreSolve = function(contact){
		
	};

	/*
	
	*/
	p.PostSolve = function(contact){
		
	};

	/*
	
	*/
	p.BeginContact = function(contact){
		var dataFixA = contact.GetFixtureA().GetUserData();
		if(dataFixA && dataFixA.type == 'footSensor'){
			// console.log('Begin Fixture A');
			// console.log(contact);
			++dataFixA.target.numFootContacts;
		}

		var dataFixB = contact.GetFixtureB().GetUserData();
		if(dataFixB && dataFixB.type == 'footSensor'){
			// console.log('Begin Fixture B');
			// console.log(contact);
			++dataFixA.target.numFootContacts;
		}
	};

	/*
	
	*/
	p.EndContact = function(contact){
		var dataFixA = contact.GetFixtureA().GetUserData();
		if(dataFixA && dataFixA.type == 'footSensor'){
			// console.log('End Fixture A');
			// console.log(contact);
			--dataFixA.target.numFootContacts;
		}

		var dataFixB = contact.GetFixtureB().GetUserData();
		if(dataFixB && dataFixB.type == 'footSensor'){
			// console.log('End Fixture B');
			// console.log(contact);
			--dataFixA.target.numFootContacts;
		}
	};

	window.ContactListener = ContactListener;
}(window));
