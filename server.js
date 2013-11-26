
/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();
// app.http().io();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.engine('html', require('ejs').renderFile);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/splash.html', routes.splash);
// app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/createGame', api.createGame);
app.get('/api/getAllGames', api.getAllGames);
app.get('/api/getCards', api.getCards);
app.post('/api/updateCards', api.updateCards);
// app.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/login' }));

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);


// express.io stuff
app.io.route('updateCards', function(req) {
    req.io.room(req.data.gid).broadcast('cardsUpdated', {message: req.data.card});
})

app.io.route('join', function(req) {
    req.io.join(req.data);
    console.log('done joining');
})

// app.get('/', function(req, res) {
//     res.sendfile(__dirname + '/views/index.html');
// })

/**
 * Start Server
 */

// http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
