// var TaskList = require('./routes/tasklist');
// var taskList = new TaskList(process.env.CUSTOMCONNSTR_MONGOLAB_URI);
/**
 * Module dependencies
 */

var express = require('express.io'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;



////////////////////////////////facebook stuff//////////////////////////
var FACEBOOK_APP_ID = "708980782452903"
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
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

////////////////////////////////facebook stuff//////////////////////////

var app = module.exports = express();
app.http().io();


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
app.get('/index', routes.index);
//app.get('/index', ensureAuthenticated, routes.index);
app.get('/auth/facebook', passport.authenticate('facebook'), routes.authFacebook);
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }), routes.authFacebookCallback);
app.get('/logout', routes.logout);

// JSON API
app.get('/api/createGame', api.createGame);
app.get('/api/getAllGames', api.getAllGames);
app.get('/api/getCards', api.getCards);
app.post('/api/updateCards', api.updateCards);
app.get('/api/deleteAllGames',api.deleteAllGames);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */
var server = http.createServer(app);
var io = require('socket.io').listen(server);

sever.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/facebook')
}

// io.sockets.on('connection', function (socket) {
//   console.log('A socket with sessionID '+socket.handshake.sessionID+' connected!');
//   socket.on('updateCards', function (data) {
//     socket.broadcast.to(data.gid).emit('cardsUpdated', {message: data.card})
//   });
//   socket.on('join', function (data) {
//     console.log('A socket with sessionID '+socket.handshake.sessionID+' joined '+data);
//     socket.join(data);
//     var clients = io.sockets.clients(data);
//     socket.broadcast.to(data.gid).emit('playersChanged', {message: clients.length})
//   });
// });
