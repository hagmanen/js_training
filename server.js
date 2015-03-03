var express    = require('express'),
    bodyParser = require('body-parser'),
    Board = require('./board.js');
var app = express();
var board = new Board();

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

app.get('/board', function(req, res) {
	return res.send({'id': 'board'});
});

app.delete('/nuke', function(req, res) {
	board.clear();
	return res.send();
});

app.use('/api', router);
app.use('/', express.static(__dirname + '/www'));

app.listen(8080);
