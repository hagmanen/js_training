var express    = require('express'),
    bodyParser = require('body-parser'),
    socket = require('socket.io'),
    Board = require('./board.js');
var app = express();
var board = new Board();

board.clear();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'some silly message'});
});

app.post('/users', function(req, res) {
	var user = board.addUser();
	if(user) {
		return res.send(user);
	} else {
		return res.status(204).send();
	}
});

app.get('/users/:id', function(req, res) {
	var user = board.getUser(req.params.id);
	if(user) {
		return res.send(user);
	} else {
		return res.status(204).send();
	}
});

app.get('/board', function(req, res) {
	return res.send(board.getBoard());
});

app.delete('/nuke', function(req, res) {
	board.clear();
	return res.send();
});

app.use('/api', router);
app.use('/', express.static(__dirname + '/www'));

var io = socket(app.listen(8080));
io.on('connect', function(socket) {
	console.log('got con');
	socket.on('move', function(msg) {
	console.log('got move');
	console.log(Object.keys(msg));
		if(board.play(board.getUser(msg.user), msg.poss)){
			socket.broadcast.emit('moved');
		}
	});
}).on('disconnect', function() {
	console.log('disconnected');
});
