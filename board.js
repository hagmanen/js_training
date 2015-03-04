var Board = function() {};

var users = [{}];
var newId = function() {
	return users.length;
};
var getColor = function() {
	return users.length ? 'blue' : 'red';
};

Board.prototype.addUser = function() {
	if(users.length < 2) {
		var user = {id : newId(), color: getColor()};
		users.push(user);
		return user;
	}
	return null;
};

Board.prototype.clear = function() {
	users = [];
};


module.exports = Board;

