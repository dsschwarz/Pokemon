
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , map = require('./routes/map')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , app = express()
  , server = require('http').createServer(app)
  , game = require('./server/js/main')
  , fs = require('fs');



var io = require('socket.io').listen(server);
io.set('log level', 0);

// all environments
app.engine = ('ejs', engine);
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/mapedit', map.mapedit)
app.get('/load', map.load)
app.get('/save', map.save)
io.on('connection', function(socket) {
	console.log("A user connected");
});

server.listen(1337);

