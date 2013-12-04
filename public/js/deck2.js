var height = $(window).height();
if(height==0){
	height = window.innerHeight;
}
var t =  height/2-170;
var l = $(window).width()/2-260;
console.log(t);
var counter=0;
for(var i=0;i<10;i++){
    document.write('<img id = "' + i + 's" class = "draggable" height = 246 width = 175 back="images/g'+ i +'.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    // document.write('<img id = "' + i + 'h" class = "draggable" height = 246 width = 175 back="images/'+ i +'h.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    // document.write('<img id = "' + i + 'c" class = "draggable" height = 246 width = 175 back="images/'+ i +'c.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    // document.write('<img id = "' + i + 'd" class = "draggable" height = 246 width = 175 back="images/'+ i +'d.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/back.jpg">');
    counter++;
}
