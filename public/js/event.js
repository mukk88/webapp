var source = new EventSource('/api/getUpdatedCards');
source.addEventListener('message', function(e) {
  console.log(e.data);
  var d = JSON.parse(e.data);
  //for loop through all cards
  console.log(d['10c']['top']);
  $('ul').append(d);
}, false);