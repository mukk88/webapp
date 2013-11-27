io = io.connect()
// console.log(io);
var pathname = window.location.pathname;
var gid = pathname.split(':')[1];
if(gid!=undefined){
    io.emit('join',gid);  
}

var position;
var total;
//change deck.js to get all cards.
