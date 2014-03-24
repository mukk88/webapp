var mongoOptions = 
{ 
  db: {safe: true }, 
  server: { 
    auto_reconnect: true, 
    socketOptions: {keepAlive: 1}  
  } 
};


//setup mongodb
var mongoose = require('mongoose');
var connectionString = "mongodb://qwert:12345@oceanic.mongohq.com:10003/guests";
mongoose.connect(connectionString, mongoOptions);

//setup auto+
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(connectionString);
autoIncrement.initialize(connection);

var guestSchema = mongoose.Schema({
  name:String,
  size:String
});

guestSchema.plugin(autoIncrement.plugin, { model: 'Guest', startAt: 1 });

var Guest = mongoose.model('Guest', guestSchema);

exports.addGuest = function(req,res){
  var name = req.body.name;
  var size = req.body.size;

  var guest = new Guest();
  Guest.nextCount(function(err,count){
    if(err){
      res.send('0');
      return;
    }
    guest.name = name;
    guest.size = size;
    guest.save();
    res.send('1')
  });
};