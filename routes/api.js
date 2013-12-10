/*
 * Serve JSON to our AngularJS client
 */

//setup mongodb
var mongoose = require('mongoose');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
// var connectionString = "mongodb://localhost/test"; 
mongoose.connect(connectionString);

//setup auto+
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

// models
// var cardSchema = mongoose.Schema({
//   cid: String,
//   card: String,
//   top: Number,
//   left: Number,
//   z: Number,
//   show: Boolean,
//   gid: Number
// });

// var userSchema = mongoose.Schema({
//   _id: String,
//   display: String,
//   gid: Number
// });

var gameSchema = mongoose.Schema({
  _id: Number,
  name: String,
  pw: String
});

gameSchema.plugin(autoIncrement.plugin, { model: 'Game', startAt: 1 });

// var Card = mongoose.model('Card', cardSchema);
var Game = mongoose.model('Game', gameSchema);
// var User = mongoose.model('User', gameSchema);


var kinds = ["c","d","h","s"];

exports.createGame = function (req, res) {
  var newGame = new Game();
  Game.nextCount(function(err, count) {
    newGame.name=req.query.name
    newGame.pw=req.query.pw
    newGame.save()
    // var cards = new Array();
    // var top = 199;
    // var left = 564;
    // var i = 0;
    // for(var k=0; k<4; k++){
    //   for(var n=1; n<=13; n++){
    //     var newCard = new Card();
    //     newCard.top = top++;
    //     newCard.left = left++;
    //     newCard.z = 1;
    //     newCard.show = false;
    //     newCard.gid = count;
    //     newCard.save();
    //     cards[i] = newCard;
    //     i++;
    //   }
    // }
    // res.json(cards);
  });
};

exports.joinGame = function (req, res) {
  var gid = req.query.gid;
  var pw = req.query.pw;
  Game.findOne({_id : gid, pw : pw}, function (err, game) {
    if(game != null){
      // Card.find({gid : gid}, function (err, cards) {
      //   res.json(cards);
      // });
      res.json(true);
    }
    else{
      res.json(false);
    }
  });
};

exports.deleteGame = function (req, res) {
  var gid = req.query.gid;
  var pw = req.query.pw;
  Game.findOne({_id : gid, pw : pw}, function (err, game) {
    if(game != null){
      // Card.remove({gid : gid}, function (err, cards) {});
      Game.remove({_id : gid}, function (err, games) {});
      res.json(true);
    }
    else{
      res.json(false);
    }
  });
};

exports.getAllGames = function (req, res) {
  Game.find({}, function (err, games) {
    res.json(games);
  });
};

exports.deleteAllGames = function (req, res) {
  Game.remove({}, function (err, games) {
    res.json(games);
  });
  Card.remove({}, function (err, cards) {
    res.json(cards);
  });
};
