var height = $(window).height();
if(height==0){
	height = window.innerHeight;
}
var t =  height/2-170;
var l = $(window).width()/2-260;
console.log(t);
var counter=0;
for(var i=1;i<14;i++){
    document.write('<img class = "draggable" height = 246 width = 175 back="../public/images/'+ i +'s.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="../public/images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="../public/images/'+ i +'h.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="../public/images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="../public/images/'+ i +'c.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="../public/images/back.jpg">');
    document.write('<img class = "draggable" height = 246 width = 175 back="../public/images/'+ i +'d.jpg" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="../public/images/back.jpg">');
    counter++;
}