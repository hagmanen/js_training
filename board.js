var Board = function() {};

var users = null;
var marks = null;

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

Board.prototype.getBoard = function() {
	return {'marks': marks};
};

Board.prototype.play = function(player, poss) {
	if(poss < 100 && poss >= 0) {
		marks[poss] = player;
	}
};

Board.prototype.clear = function() {
	users = [];
	marks = [];

	var length = 100;
	for(var i = 0; i < length; i++) {
	    marks.push('e');
	}
};


module.exports = Board;

