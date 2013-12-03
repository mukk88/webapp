/**
 * Module dependencies
 */
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var app = module.exports = express();

/**
 * facebook stuff
 */
var FACEBOOK_APP_ID = "708980782452903";
var FACEBOOK_APP_SECRET = "695824078d253ad54d17e1beb59d29a8";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://cardables.azurewebsites.net/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/facebook')
}

/**
 * Configuration
 */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
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
app.get('/', routes.splash);
app.get('/index.html', routes.index);
app.get('/play.html', routes.play);
app.get('/pitch.html', routes.pitch);
//app.get('/index', ensureAuthenticated, routes.index);
app.get('/auth/facebook', passport.authenticate('facebook'), routes.authFacebook);
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }), routes.authFacebookCallback);
app.get('/logout', routes.logout);

// JSON API
app.get('/api/createGame', api.createGame);
app.get('/api/deleteGame', api.deleteGame);
app.get('/api/joinGame', api.joinGame);
app.get('/api/getAllGames', api.getAllGames);
app.get('/api/deleteAllGames',api.deleteAllGames);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT ||  3000; 
server.listen(port, function () {
  // console.log('Express server listening on port ' + app.get('port'));
});


/**
 * Socket.io stuff
 */
io.sockets.on('connection', function (socket) {
  // console.log('sessionID '+socket.id+' connected!');
  socket.on('updateCards', function (data) {
    // console.log('updateCards '+data.gid + ' ' + data.card);
    socket.broadcast.to(data.gid).emit('cardsUpdated', {message: data.card})
  });

  socket.on('join', function (data) {
    // console.log('sessionID '+socket.id+' joined '+data);
    socket.join(data);
    var results = new Array();
    var clients = io.sockets.clients(data);
    for(var i=0; i<clients.length; i++){
      results.push(clients[i].id);
    }
    socket.broadcast.to(data).emit('players', {message: results});
    socket.emit('players', {message: results});
  });

  socket.on('disconnect', function () {
    // console.log('sessionID '+socket.id+' disconnected!');
    rooms = io.sockets.manager.roomClients[socket.id];
    room = Object.keys(rooms)[1].substring(1);
    socket.leave(room);
    var results = new Array();
    var clients = io.sockets.clients(room);
    for(var i=0; i<clients.length; i++){
      results.push(clients[i].id);
    }
    socket.broadcast.to(room).emit('players', {message: results})
  });
});