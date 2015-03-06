var Board = function() {};

var users = null;
var marks = null;
var turn = 0;

var newId = function() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
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

Board.prototype.getUser = function(id) {
	for(var i = 0; i < users.length; i++) {
		if(id == users[i].id) { return  users[i]; }
	}
	return null;
};

Board.prototype.getBoard = function() {
	return {'marks': marks, 'turn': users[turn].color};
};

Board.prototype.play = function(player, poss) {
	console.log(player.id + ' play when it is ' + users[turn].id + ' turn');
	if(player.id != users[turn].id) {
		return;
	}
	if(poss < 100 && poss >= 0) {
		marks[poss] = player.color;
	}
	turn = (turn + 1) % 2;
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

