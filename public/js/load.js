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
            if(orig.changedTouches[0].pageY - offset > 100){
                element.height(70);
            }
            if(orig.changedTouches[0].pageY - offset < 100){
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
            $('#mat' + $(this).attr('id')[10]).css('height',70);
        });
    });
}

// function sendCardData(me, top, left, z, parent){
//     console.log('a');
// }

function sendPlayers(number, cards){
    console.log('sending player info');
    var player = {'players':number,'cards':cards};
    $.ajax({
        url:"/api/updateCards?gid=1",
        type:"post",
        data:player
    }).done(function(){
        // alert('done');
    });
}

function sendShuffle(){
    var player = {'shuffle':true};
    $.ajax({
        url:"/api/updateCards?gid=1",
        type:"post",
        data:player
    }).done(function(){
        // alert('done');
    });
}

function shuffle(){
    $('.draggable').appendTo('body');
    $('.matsbar').empty();
    $('.viewbar').empty();
    var cards = $('.draggable');
    $.each(cards, function(i,val){
        $(val).css('zIndex', Math.round(Math.random()*300));
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
}

function deal(people, cards){
    $('.viewbar').append('<button class = "button view" id ="tablebutton" style="left:120px">Table</button>');
    for(i=0;i<people;i++){
        $('.viewbar').append('<button id="#matbutton'+i+'" class = "button view" style="left:'+(230+i*110)+'px">Player '+(i+1)+'</a>');
    }
    for(i=0;i<people;i++){
        $('.matsbar').append('<div class = "mats" id = "mat'+i+'"><span class = "playernumber">Player '+(i+1)+'</span></div>');
    }
    $('.mats').minimize();
    $('.view').selectMat();
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
    $('#mat0').height(70);
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
            $('#shuffle').click();
            sendPlayers(people,cards); 
        }catch(err){
            console.log(err);
        }
    })
});
$(".draggable").draggableTouch('disgroup');

var source = new EventSource('/api/getUpdatedCards?gid=1');
source.addEventListener('message', function(e) {
  console.log(e.data);
    var data = JSON.parse(e.data);
    var id = data['id'];
    if(id!=undefined){
        id = '#'+id;
        $(id).css({
            top: data['info']['top'],
            left: data['info']['left'],
            zIndex: data['info']['z']
        });
        $(id).appendTo(data['info']['parent']);
        if(data['info']['back']!=$(id).attr("back")){
            $(id).flip();
        }  
    }
    //put the card in the right parent
    var players = data['players'];
    var cards = data['cards'];
    if(players!=undefined && cards!=undefined){
        deal(players,cards);
    }
    var shuf = data['shuffle'];
    if(shuf!=undefined){
        shuffle();
    }
}, false);