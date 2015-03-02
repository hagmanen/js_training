var express    = require('express'),
    bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'some silly message'});
});

app.use('/api', router);
app.use('/', express.static(__dirname + '/root'));

app.listen(8080);
