var express    = require('express'),
    bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'some silly message'});
});

app.post('/users', function(req, res) {
	return res.send({'id': 'nrone'});
});

app.use('/api', router);
app.use('/', express.static(__dirname + '/www'));

app.listen(8080);
