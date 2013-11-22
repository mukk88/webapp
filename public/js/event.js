var source = new EventSource('/api/getUpdatedCards');
source.addEventListener('message', function(e) {
  console.log(e.data);
	var d = JSON.parse(e.data);
	//for loop through all cards
	console.log(d['id']);
	// console.log(d['13d']['top']);

	// d['id']

	var id = d['id'];
	// var info = d['info']['top'];
	 $('#'+id).css({
	    top: d['info']['top'],
	    left: d['info']['left']
	});
	// $('#12d').css({
	//     top: d['12d']['top'],
	//     left: d['12d']['left']
	// }); 
}, false);