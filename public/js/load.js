jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
};

jQuery.fn.flip = function() {
    var back = $(this).attr("back");
    var front = $(this).attr("src");
    $(this).attr("src", back);
    $(this).attr("back", front);    
    $(this).width(175);
    $(this).height(246);
};

jQuery.fn.minimize = function(){
    this.each(function(){
        var element = $(this);
        var offset = 0;
        var height = $(window).height();
        if(height==0){
            height = window.innerHeight;
        }
        element.bind("touchstart", function(e){
            var orig = e.originalEvent;
            offset = orig.changedTouches[0].pageY;
        });
        element.bind("touchmove", function(e){
            e.preventDefault();
            var orig = e.originalEvent;
            if (orig.targetTouches.length > 1){
                return;
            }
            if(orig.changedTouches[0].pageY - offset > 250){
                element.height(70);
            }
            if(orig.changedTouches[0].pageY - offset < 120){
                element.height(height*0.6);
            }
        });
        element.bind("touchend", function(e){

        });
    });
}

jQuery.fn.selectMat = function(){
    this.each(function(){
        var height = $(window).height();
        if(height==0){
            height = window.innerHeight;
        }
        $(this).bind('click', function(e){
            $('.mats').css('height',1);
            $('#mat' + $(this).attr('id')[9]).css('height',height*0.6);
        });
    });
};

jQuery.fn.sortCard = function(type){
    this.each(function(){
        $(this).bind('click', function(e){
            var matcards = $( "#mat" + $(this).attr('id')[10] + " > .draggable" ).sort(function(a,b){
                if(type=="suit"){
                    if($(a).attr('id').slice(-1).charCodeAt() == $(b).attr('id').slice(-1).charCodeAt()){
                        return parseInt($(a).attr('id').substring(0, $(a).attr('id').length-1)) - 
                        parseInt($(b).attr('id').substring(0, $(b).attr('id').length-1));
                    }else{
                        return $(a).attr('id').slice(-1).charCodeAt() - $(b).attr('id').slice(-1).charCodeAt();
                    }
                }else{
                    return parseInt($(a).attr('id').substring(0, $(a).attr('id').length-1)) - 
                    parseInt($(b).attr('id').substring(0, $(b).attr('id').length-1));                    
                }
            });
            var counter = 0;
            $.each(matcards, function(i, val){
                $(val).css({
                    top: 100,
                    left:100 + counter*30,
                    zIndex:counter
                });
                counter++;
            });
        });
    });
};

// function sendCardData(me, top, left, z, parent){
//     console.log('a');
// }

function sendPlayers(number, cards){
    console.log('sending player info');
    var player = {'gid':gid,card:{'players':number,'cards':cards}};
    io.emit('updateCards', player);
}

function sendShuffle(indexes){
    var shuffle = {'gid':gid,card:{'shuffle':true, 'indexes':indexes}};
    io.emit('updateCards', shuffle);
}


function shuffle(indexlist){
    $('.draggable').appendTo('body');
    $('.matsbar').empty();
    $('.viewbar').empty();
    var cards = $('.draggable');
    var indexes = {};
    $.each(cards, function(i,val){
        if(indexlist==undefined){
            var randno = Math.round(Math.random()*300);
            $(val).css('zIndex', randno);
            indexes[$(val).attr('id')] = randno;
        }else{
            $(val).css('zIndex', indexlist[$(val).attr('id')]);
        }
        $(val).css({
            top: height/2-170,
            left: $(window).width()/2-260
        });
        $(val).rotate(Math.round(Math.random()*5-2));
        var front = $(val).attr("src");
        if(front!='images/back.jpg'){
            $(val).flip();
        }
    })
    return indexes;
}

function deal(people, cards){
    $('.viewbar').append('<button class = "button view" id ="tablebutton" style="left:120px">Table</button>');
    for(i=0;i<people;i++){
        $('.viewbar').append('<button id="matbutton'+i+'" class = "button view" style="left:230px">Hand</a>');
    }
    for(i=0;i<people;i++){
        $('.matsbar').append('<div class = "mats" id = "mat'+i+'"><span class = "playernumber">Player '+(i+1)+'</span></div>');
        $('#mat'+i).append('<button id="sortbutton'+i+'" class = "button sort suit" style="right:200px">Sort by suit</a>');
        $('#mat'+i).append('<button id="sortbutton'+i+'" class = "button sort num" style="right:315px">Sort by number</a>');
    }
    $('.mats').minimize();
    $('.view').selectMat();
    $('.suit').sortCard('suit');
    $('.num').sortCard('num');
    $('.view').hide();
    $('#matbutton' + position).show();
    $('#tablebutton').show();
    var allcards = $('.draggable').sort(function(a,b){
        return $(a).css("zIndex") - $(b).css("zIndex");
    });
    var counter = 1;
    var delay = 10;
    $.each(allcards,function(index,val){
        setTimeout((function(v){
            return function(){
                if(counter>people*cards){
                    return false;
                }
                $(v).css({
                    top: 100,
                    left:100 + counter*10
                });
                counter++;
                $(v).appendTo('#mat'+ (counter%people));
                $(v).flip();
            }
        })(val), delay);
        delay+=10;
    });
    $('#mat' + position).height(70);
    $('#peopleinput').val('');
    $('#cardsinput').val('');
}

$(document).ready(function() {
    var height = $(window).height();
    if(height==0){
        height = window.innerHeight;
    }
    $("#enable").click(function() {
    	$(".draggable").draggableTouch("disable");
        $(".draggable").draggableTouch();
    });
    $("#disable").click(function() {
    	$(".draggable").draggableTouch("disable");
        $(".draggable").draggableTouch("disgroup");
    });
    $("#shuffle").click(function(){
        console.log(io);
        shuffle();
        sendShuffle();
    })
    $("#deal").click(function(){
        var people;
        var cards;
        try{
            people = parseInt($('#peopleinput').val());
            cards = parseInt($('#cardsinput').val());
            if(isNaN(people)){  
                people = 4;
            }
            if(isNaN(cards)){
                cards = 13;
            }
            var results = shuffle();
            deal(total,cards);
            sendShuffle(results);
            sendPlayers(total,cards); 
        }catch(err){
            console.log(err);
        }
    })
});
$(".draggable").draggableTouch('disgroup');
$(".draggable").on('doubletap', function(){
    console.log('double tapped!');
    $(this).flip();
    sendCardData($(this).attr('id'), $(this).css('top'),$(this).css('left'),$(this).css('zIndex'), $(this).parent().attr('id'), $(this).attr('back'));
});

io.on('cardsUpdated', function(data) {
    var id = data.message['id'];

    console.log(id);
    if(id!=undefined){
        console.log('updating card info')
        id = '#'+id;
        $(id).css({
            top: data.message['info']['top'],
            left: data.message['info']['left'],
            zIndex: data.message['info']['z']
        });
        var parent = data.message['info']['parent'] == 'body' ? 'body' : '#' + data.message['info']['parent'];
        $(id).appendTo(parent);
        if(data.message['info']['parent'])
        if(data.message['info']['back']!=$(id).attr("back")){
            $(id).flip();
        }  
    }
    //put the card in the right parent
    var players = data.message['players'];
    var cards = data.message['cards'];
    if(players!=undefined && cards!=undefined){
        deal(players,cards);
    }
    var shuf = data.message['shuffle'];
    if(shuf!=undefined){
        console.log(data.message['indexes']);
        var discard = shuffle(data.message['indexes']);
    }
})  
