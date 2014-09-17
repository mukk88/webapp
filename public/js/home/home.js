
$(document).ready(function() {
	var h = window.innerHeight;
	var w = $(window).width();
	console.log(w);
	if(w>h){
		$('.story').height(h);
		$('.story-2').height(h);
	}else{
		h=600;
		$('#me').css('display','none');
		$('#selftext').css('margin','0 auto');
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

	// var feed = new Instafeed({
	//     get: 'user',
	//     userId: 297875328,
	//     accessToken:'297875328.467ede5.a3dd90d528464ee3a577e2364558a00d',
	//     // get: 'tagged',
 //    	// tagName: 'awesome',
	//     clientId: '10ada4796d6c413596c34d30b093020e'
	// });
	// feed.run();
})
