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
                if(grouped){
                    offset = {
                        // x: orig.changedTouches[0].pageX - pos.left,
                        // y: orig.changedTouches[0].pageY - pos.top,
                        x: orig.changedTouches[0].pageX,
                        y: orig.changedTouches[0].pageY,
                    };
                    var draggables = $('.draggable');
                    $.each(draggables,function(i, val){
                        if(  Math.abs(parseInt(val.style.top) - pos.top) < 100 && Math.abs(parseInt(val.style.left) - pos.left) < 100){
                            offsetstop[i] = orig.changedTouches[0].pageY - parseInt(val.style.top);
                            offsetsleft[i] = orig.changedTouches[0].pageX - parseInt(val.style.left);
                            offsets[i] = val;
                        }
                    });
                }else{
                    offset = {
                        x: orig.changedTouches[0].pageX - pos.left,
                        y: orig.changedTouches[0].pageY - pos.top,
                    };
                }
                element.trigger("dragstart", pos);
            });
            element.bind("touchmove", function(e) {
                e.preventDefault();
                var orig = e.originalEvent;

                // do now allow two touch points to drag the same element
                if (orig.targetTouches.length > 1){
                    console.log('double touched - use to flip cards over?');
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