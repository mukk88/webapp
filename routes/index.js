
/*
 * GET home page.
 */

exports.index = function(req, res){
  // res.render('index');
  res.render('index.html');
};

exports.splash = function(req,res){
	res.render('splash.html');
}

// exports.partials = function (req, res) {
//   var name = req.params.name;
//   res.render('partials/' + name);
// };