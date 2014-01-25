
$(document).ready(function() {
	var h = window.innerHeight;
	var w = $(window).width();
	console.log(w);
	if(w>h){
		$('.story').height(h);
		$('.story-2').height(h);
	}else{
		$('.story').height(1000);
		$('#me').css('display','none');
	}

	$(window).scroll(function(){
		$('li').css('color','black');
		var curheight = $(this).scrollTop();
		for(var i =0;i<5;i++){
			if(curheight < (i+1)*h){
				$('#li' + i ).css('color','#BAA378');
				break;
			}
		}
	})
	$('#navs > li').each(function(index){
		$(this).click(function(){
			$('html,body').animate({scrollTop: (index*h)}, 1000);
		});
	});

	$('#li0').css('color','#BAA378');	
})
