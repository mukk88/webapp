var height = $(window).height();
if(height==0){
	height = window.innerHeight;
}
var t =  height/2-170;
var l = $(window).width()/2-260;
console.log(t);
var counter=0;
for(var i=1;i<12;i++){
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'s.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'h.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'c.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="images/'+ i +'d.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    counter++;
}
document.write('<img id = "12d" class = "draggable" height = 246 width = 175 back="images/'+ 12 +'d.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
document.write('<img id = "13d" class = "draggable" height = 246 width = 175 back="images/'+ 13 +'d.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
