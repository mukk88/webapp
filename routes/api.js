/*
 * Serve JSON to our AngularJS client
 */

//setup mongodb
var mongoose = require('mongoose');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
mongoose.connect(connectionString);
// mongoose.connect('mongodb://localhost/test');

//setup auto+
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/test");
autoIncrement.initialize(connection);

// var redis = require('redis'),
//     publisherClient = redis.createClient();


// models
var cardSchema = mongoose.Schema({
  _id: String,
  card: String,
  top: Number,
  left: Number,
  z: Number,
  show: Boolean,
  gid: Number
});

var gameSchema = mongoose.Schema({
  _id: Number
});

gameSchema.plugin(autoIncrement.plugin, { model: 'Game' });

var Card = mongoose.model('Card', cardSchema);
var Game = mongoose.model('Game', gameSchema);


var kinds = ["c","d","h","s"];

exports.createGame = function (req, res) {
  var newGame = new Game();
  Game.nextCount(function(err, count) {
    newGame.save()
    var results = new Array();
    var top = 199;
    var left = 564;
    var i = 0;
    for(var k=0; k<4; k++){
      for(var n=1; n<=13; n++){
        var newCard = new Card();
        newCard._id = n+kinds[k];
        newCard.top = top++;
        newCard.left = left++;
        newCard.z = 1;
        newCard.show = false;
        newCard.gid = count;
        newCard.save();
        results[i] = newCard;
        i++;
      }
    }
    res.json(results);
  });
};

exports.getAllGames = function (req, res) {
  Game.find({}, function (err, games) {
    res.json(games);
  });
};

exports.getCards = function (req, res) {
  var gid = req.query.gid
  console.log(gid)
  Card.find({gid : gid}, function (err, cards) {
    res.json(cards);
  });
};

exports.updateCards = function (req, res) {
  //update to db
  // for (var i = 0; i < result.d.length; i++) { 
  //   alert(result.d[i].EmployeeName);
  // }
  // var gid = req.body[0].gid
  var gid = req.query.gid
  publisherClient.publish('updates'+gid, (JSON.stringify(req.body)));
  console.log("someone updated "+gid);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('All clients have received update!');
  res.end();
};

exports.getUpdatedCards = function (req, res) {
  var gid = req.query.gid
  // let request last as long as possible
  req.socket.setTimeout(Infinity);

  var subscriber = redis.createClient();

  subscriber.subscribe("updates"+gid);
  console.log("someone subscribing "+gid);

  // In case we encounter an error...print it out to the console
  subscriber.on("error", function(err) {
    console.log("Redis Error: " + err);
  });

  // When we receive a message from the redis connection
  subscriber.on("message", function(channel, message) {
    res.write("data: " + message + '\n\n'); // Note the extra newline
  });

  //send headers for event-stream connection
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write('\n');

  // The 'close' event is fired when a user closes their browser window.
  // In that situation we want to make sure our redis channel subscription
  // is properly shut down to prevent memory leaks...and incorrect subscriber
  // counts to the channel.
  req.on("close", function() {
    subscriber.unsubscribe();
    subscriber.quit();
  });
};

// exports.name = function (req, res) {
//   res.json({
//   	name: 'Bob'
//   });
// };