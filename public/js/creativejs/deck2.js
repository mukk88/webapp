var height = $(window).height();
if(height==0){
	height = window.innerHeight;
}
var t =  height/2-170;
var l1 = $(window).width()/2-260;
var l2 = $(window).width()/2;
var l3 = $(window).width()/2+260;
var l4 = $(window).width()/2+520;
console.log(t);
var counter=0;
for(var i=0;i<10;i++){
    document.write('<img id = "' + i + 'g" class = "draggable" height = 246 width = 175 back="images/creativeimages/g'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l1+counter) + 'px;" src="images/creativeimages/back.jpg">');
    document.write('<img id = "' + i + 'r" class = "draggable" height = 246 width = 175 back="images/creativeimages/r'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l2+counter) + 'px;" src="images/creativeimages/back.jpg">');
    document.write('<img id = "' + i + 'c" class = "draggable" height = 246 width = 175 back="images/creativeimages/c'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l3+counter) + 'px;" src="images/creativeimages/back.jpg">');
    document.write('<img id = "' + i + 'a" class = "draggable" height = 246 width = 175 back="images/creativeimages/a'+ i +'.png" style="top:' + (t+counter) + 'px; left:' + (l4+counter) + 'px;" src="images/creativeimages/back.jpg">');
    counter++;
}
