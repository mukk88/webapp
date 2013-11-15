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
        var diff = 0;
        var cards = $('.draggable');
        $.each(cards, function(i,val){
            $(val).css('zIndex', Math.round(Math.random()*52));
            $(val).css({
                top: 200+diff,
                left: 565+diff
            });
            var back = $(val).attr("back");
            var front = $(val).attr("src");
            if(front!='images/back.jpg'){
                $(val).attr("src", back);
                $(val).attr("back", front);
                $(val).width(175);
                $(val).height(246);
            }
            diff++;
        })
    })
});
$(".draggable").draggableTouch('disgroup');