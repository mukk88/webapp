// var express = require('express.io'),
//     routes = require('./routes'),
//     api = require('./routes/api'),
//     http = require('http'),
//     path = require('path');

// var app = module.exports = express();
// app.http().io();

// app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(app.router);
// app.engine('html', require('ejs').renderFile);

// // development only
// if (app.get('env') === 'development') {
//   app.use(express.errorHandler());
// }

// // production only
// if (app.get('env') === 'production') {
//   // TODO
// };

// /**
//  * Routes
//  */

// // serve index and view partials
// app.get('/', routes.index);
// app.get('/splash.html', routes.splash);

// // JSON API
// app.get('/api/createGame', api.createGame);
// app.get('/api/getAllGames', api.getAllGames);
// app.get('/api/getCards', api.getCards);
// app.post('/api/updateCards', api.updateCards);

// // redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

// // express.io
// app.io.route('updateCards', function(req) {
//     req.io.room(req.data.gid).broadcast('cardsUpdated', {message: req.data.card});
// })

// app.io.route('join', function(req) {
//     req.io.join(req.data);
//     console.log('done joining');
// })

// app.listen(process.env.PORT, function () {
//   console.log('Express server listening on port ' + app.get('port'));
// });


var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello github\n');
}).listen(port);