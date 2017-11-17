var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var routes = require('./routes/index');

var app = express();
app.disable('x-powered-by');

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'))

app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log('Server started on port' + app.get('port'));
});

module.exports = app;