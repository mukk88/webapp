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
    // io = require('socket.io');



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

///////////////////////////////express.io stuff////////////////////////
// var rooms = {};
app.io.route('updateCards', function(req) {
    req.io.room(req.data.gid).broadcast('cardsUpdated', {message: req.data.card});
})

app.io.route('join', function(req) {
    req.io.join(req.data);
    // if(rooms[req.data] == undefined){
    //   rooms[req.data] = 0;
    // }
    // rooms[req.data]++;
    // req.io.room(req.data).broadcast('playerEnters', {message: req.data.card});
    console.log('done joining');
})

// app.io.route('getAllPlayers', function(req) {
//     req.io.join(req.data);
//     req.io.room(req.data).broadcast('playerEnters', {message: req.data.card});
//     if(rooms[req.data] == undefined){
//       rooms[req.data] = [];
//     }
//     rooms[req.data].push(req.id);
//     console.log('someone joined');
// })

// io.sockets.on('connection', function (socket) {
//     console.log('someone connected');
//     socket.on('disconnect', function () {
//         console.log('someone disconnected');
//         count--;
//         io.sockets.emit('count', {
//             number: count
//         });
//     });
// });
///////////////////////////////express.io stuff////////////////////////


/**
 * Start Server
 */

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/facebook')
}
