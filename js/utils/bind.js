/**
 * http://stackoverflow.com/questions/183214/javascript-callback-scope
 * bind function create a closure of a desired scope for the passed in function parameter.
 *
 */
function bind(scope, func) {
    return function () {
        func.apply(scope, arguments);
    };
}

/*
	http://blog.bripkens.de/2011/05/maintaining-and-testing-scope-in-javascript/
	Don't konw which way is better... probably, this is slower than former function approach.
*/
Function.prototype.bind = function(scope){
	var func = this;
	return function(){
		return func.apply(scope, arguments);
	};
};