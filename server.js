var express    = require('express'),
    bodyParser = require('body-parser'),
    ejs        = require('ejs');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'some silly message'});
});

app.set('views', __dirname + '/root');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use('/api', router);

app.get('/', function(req, res) {
	res.render(__dirname + '/root');
});

app.listen(8080);
