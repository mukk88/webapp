/**
 * jQuery Draggable Touch v0.5
 * Jonatan Heyman | http://heyman.info 
 *
 * Make HTML elements draggable by using uses touch events.
 * The plugin also has a fallback that uses mouse events, 
 * in case the device doesn't support touch events.
 * 
 * Licenced under THE BEER-WARE LICENSE (Revision 42):
 * Jonatan Heyman (http://heyman.info) wrote this file. As long as you retain this 
 * notice you can do whatever you want with this stuff. If we meet some day, and 
 * you think this stuff is worth it, you can buy me a beer in return.
 */

function sendCardData(id, top, left, z, parent, back){
    var carddata = {'gid':gid,card:{'id':id,'info':{'top':top, 'left':left, 'z':z, 'parent':parent, 'back':back}}};
    io.emit('updateCards', carddata);
};

;(function($){
    $.fn.draggableTouch = function(action) {
        // check if the device has touch support, and if not, fallback to use mouse
        // draggableMouse which uses mouse events
        if (!("ontouchstart" in document.documentElement)) {
            return this.draggableMouse(action);
        }
        
        // check if we shall make it not draggable
        if (action == "disable") {
            this.unbind("touchstart");
            this.unbind("touchmove");
            this.unbind("touchend");
            this.unbind("touchcancel");
            return this;
        }

        this.each(function() {
            var element = $(this);
            var offset = null;
            var offsetstop = {};
            var offsetsleft = {};
            var offsets = {};

            var grouped = (action=="disgroup") ? false : true;

            var end = function(e) {
                e.preventDefault();
                var orig = e.originalEvent;
                
                element.trigger("dragend", {
                    top: orig.changedTouches[0].pageY - offset.y,
                    left: orig.changedTouches[0].pageX - offset.x 
                });
            };
            
            element.bind("touchstart", function(e) {
                var orig = e.originalEvent;
                var pos = $(this).position();
                offsets = {};
                offsetstop = {};
                offsetsleft = {};

                //bring to front
                var highZ = 0;
                var allCards = $('.draggable');
                $.each(allCards, function(i,val){
                    if(parseInt($(val).css("zIndex")) > highZ){
                        highZ = parseInt($(val).css("zIndex"));
                    }
                })
                $(this).css("zIndex", parseInt(highZ)+1);
                highZ = 0;
                //might have to reset them all if it gets too high.. 

                if(grouped){
                    offset = {
                        x: orig.changedTouches[0].pageX,
                        y: orig.changedTouches[0].pageY,
                    };
                    var draggables = $('.draggable');
                    $.each(draggables,function(i, val){
                        if(  Math.abs(parseInt(val.style.top) - pos.top) < 100 && Math.abs(parseInt(val.style.left) - pos.left) < 100){
                            offsetstop[i] = orig.changedTouches[0].pageY - parseInt(val.style.top);
                            offsetsleft[i] = orig.changedTouches[0].pageX - parseInt(val.style.left);
                            offsets[i] = val;
                            if (orig.targetTouches.length > 1){
                                var back = $(val).attr("back");
                                var front = $(val).attr("src");
                                $(val).attr("src", back);
                                $(val).attr("back", front);
                                $(val).width(175);
                                $(val).height(246);
                            }
                        }
                    });
                }else{
                    if (orig.targetTouches.length > 1){
                        var back = $(this).attr("back");
                        var front = $(this).attr("src");
                        $(this).attr("src", back);
                        $(this).attr("back", front);
                        $(this).width(175);
                        $(this).height(246);
                    }
                    offset = {
                        x: orig.changedTouches[0].pageX - pos.left,
                        y: orig.changedTouches[0].pageY - pos.top,
                    };
                }
                sendCardData($(this).attr('id'), $(this).css('top'),$(this).css('left'),$(this).css('zIndex'), $(this).parent().attr('id'), $(this).attr('back'));
                element.trigger("dragstart", pos);
            });
            element.bind("touchmove", function(e) {
                e.preventDefault();
                var orig = e.originalEvent;

                // do now allow two touch points to drag the same element
                if (orig.targetTouches.length > 1){
                    return;
                }
 
                $(this).css({
                    top: orig.changedTouches[0].pageY - offset.y,
                    left: orig.changedTouches[0].pageX - offset.x
                });
                if(grouped){
                    for(var key in offsetstop){
                        $(offsets[key]).css({
                            top: orig.changedTouches[0].pageY - offsetstop[key],
                            left: orig.changedTouches[0].pageX - offsetsleft[key]
                        })
                    }
                }
                var height = $(window).height();
                if(height==0){
                    height = window.innerHeight;
                }

                if( parseInt($(this).css('top')) < -50){
                    $(this).css({
                        top: orig.changedTouches[0].pageY - height/4
                    });
                    $(this).appendTo('body');   
                }

                var mats  = $('.mats');
                var matno = -1;
                $.each(mats, function(index ,val){
                    if(parseInt($(val).css('height'))>height/4){
                        matno = index;
                    }
                });
                if(matno>-1 &&  $(this).parent().is('body') && parseInt($(this).css('top')) > height/4+50){
                        offset.y = height/10*4+50;
                        $(this).appendTo('#mat' + matno);
                }
                sendCardData($(this).attr('id'), $(this).css('top'),$(this).css('left'),$(this).css('zIndex'), $(this).parent().attr('id'), $(this).attr('back'));
            });
            element.bind("touchend", end);
            element.bind("touchcancel", end);
        });
        return this;
    };
    
    /**
     * Draggable fallback for when touch is not available
     */
    $.fn.draggableMouse = function (action) {
        // check if we shall make it not draggable
        if (action == "disable") {
            this.unbind("mousedown");
            this.unbind("mouseup");
            return this;
        }
        
        this.each(function() {
            var element = $(this);
            var offset = null;
            
            var move = function(e) {
                element.css({
                    top: e.pageY - offset.y,
                    left: e.pageX - offset.x,
                });
            };
            var up = function(e) {
                element.unbind("mouseup", up);
                $(document).unbind("mousemove", move);
                element.trigger("dragend", {
                    top: e.pageY - offset.y,
                    left: e.pageX - offset.x
                });
            };
            element.bind("mousedown", function(e) {
                var pos = element.position();
                offset = {
                    x: e.pageX - pos.left,
                    y: e.pageY - pos.top
                };
                $(document).bind("mousemove", move);
                element.bind("mouseup", up);
                element.trigger("dragstart", pos);
            });
        });
        return this;
    };
})(jQuery);