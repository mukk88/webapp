var t =  $(window).height()/2-170;
var l = $(window).width()/2-260;
var counter=0;
for(var i=1;i<14;i++){
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'s.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'h.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'c.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'d.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    counter++;
}