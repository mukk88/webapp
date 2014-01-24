
$(document).ready(function() {
	var h = window.innerHeight;
	console.log(h)
	$('.story').height(h);
	$('.story-2').height(h);

	$('#navs > li').each(function(index){
		console.log(index);
		$(this).click(function(){
			$('html,body').animate({scrollTop: (index*h)}, 1000);
		});
	});

	
})
