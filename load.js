jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
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
            var allcards = $('.draggable').sort(function(a,b){
                console.log($(a).css("zIndex"));
                return $(a).css("zIndex") - $(b).css("zIndex");
            });
            var w = $(window).width();
            var h = $(window).height();
            var positions = [[10,h/2-100],[w/2-50, h-300],[w-320,h/2-100],[w/2-50, 10]];
            var playpos = [];
            for(var i =0;i<people;i++){
                playpos.push([positions[i]]);
            }
            var counter = 1;
            var delay = 100;
            console.log(cards);
            $.each(allcards,function(index,val){
                setTimeout((function(v){
                    return function(){
                        if(counter>people*cards){
                            return false;
                        }
                        $(v).css({
                            top: playpos[counter%people][0][1],
                            left:playpos[counter%people][0][0] + counter
                        });
                        counter++;
                    }
                })(val), delay);
                delay+=100;
            });
            $('#peopleinput').val('');
            $('#cardsinput').val(''); 
        }catch(err){
            console.log(err);
        }
    })
});
$(".draggable").draggableTouch('disgroup');