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
        $(this).bind('click', function(e){
            $('.mats').css('height',1);
            $('#mat' + $(this).attr('id')[10]).css('height',500);
        });
    });
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
            $('.viewbar').append('<button class = "button view" id ="tablebutton" style="left:120px">Table</button>');
            for(i=0;i<people;i++){
                $('.viewbar').append('<button id="#matbutton'+i+'" class = "button view" style="left:'+(230+i*110)+'px">Player '+(i+1)+'</a>');
            }
            for(i=0;i<people;i++){
                $('.matsbar').append('<div class = "mats" id = "mat'+i+'"><span class = "playernumber">Player '+(i+1)+'</span></div>');
            }
            $('body').bind("touchend", function(e){
                $("<a href='#table'></a>").click(); 
            });
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
        }catch(err){
            console.log(err);
        }
    })
});
$(".draggable").draggableTouch('disgroup');