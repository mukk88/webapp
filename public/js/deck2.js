var height = $(window).height();
if(height==0){
	height = window.innerHeight;
}
var t =  height/2-170;
var l = $(window).width()/2-260;
console.log(t);
var counter=0;
for(var i=0;i<10;i++){
    document.write('<img id = "' + i + 's" class = "draggable" height = 246 width = 175 back="images/creativeimages/g'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/creativeimages/back.jpg">');
    document.write('<img id = "' + i + 's" class = "draggable" height = 246 width = 175 back="images/creativeimages/r'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/creativeimages/back.jpg">');
    document.write('<img id = "' + i + 's" class = "draggable" height = 246 width = 175 back="images/creativeimages/c'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/creativeimages/back.jpg">');
    document.write('<img id = "' + i + 's" class = "draggable" height = 246 width = 175 back="images/creativeimages/a'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l+counter) + 'px;" src="images/creativeimages/back.jpg">');
    counter++;
}
