io = io.connect()

io.emit('join',99);  

var position = 0;
var total = 0;

io.on('players', function(data){
    var num = 0;
    for(var i=0;i<data.message.length;i++){
        if(io.socket.sessionid == data.message[i]){
            num = i+1;
            break;
        }
    }
    position = num-1;
    total = data.message.length;
    $('.info').html('number of players: ' + data.message.length + ' i am player: ' + num);
})
//change deck.js to get all cards.
