io = io.connect()
var pathname = window.location.pathname;
var gid = pathname.split(':')[1];
if(gid!=undefined){
    io.emit('join',gid);  
}

        //change deck to get all cards.
