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

$(document).ready(function() {
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
                top: $(window).height()/2-170,
                left: $(window).width()/2-260
            });
            $(val).rotate(Math.round(Math.random()*5-2));
            var back = $(val).attr("back");
            var front = $(val).attr("src");
            if(front!='images/back.jpg'){
                $(val).attr("src", back);
                $(val).attr("back", front);
                $(val).width(175);
                $(val).height(246);
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
            $('.viewbar').append('<a href="#table" class = "button view" id ="tablebutton" style="left:120px">Table</a>');
            for(i=0;i<people;i++){
                $('.viewbar').append('<a href="#mat'+i+'" class = "button view" style="left:'+(230+i*110)+'px">Player '+(i+1)+'</a>');
            }
            for(i=0;i<people;i++){
                $('.matsbar').append('<div class = "mats" id = "mat'+i+'"><span class = "playernumber">Player '+(i+1)+'</span></div>');
            }
            $('body').bind("touchend", function(e){
                $("<a href='#table'></a>").click(); 
            });
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
            $('#peopleinput').val('');
            $('#cardsinput').val(''); 
        }catch(err){
            console.log(err);
        }
    })
});
$(".draggable").draggableTouch('disgroup');