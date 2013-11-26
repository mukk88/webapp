
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

<<<<<<< HEAD
exports.splash = function(req,res){
	res.render('splash.html');
}

// exports.partials = function (req, res) {
//   var name = req.params.name;
//   res.render('partials/' + name);
// };
=======
exports.splash = function(req, res){
  res.render('splash.html');
};

exports.authFacebook = function(req, res){
  // should never be called
};

exports.authFacebookCallback = function(req, res){
  res.redirect('account');
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
>>>>>>> 6cb7904e0ed2a54e13222e3472b0c37bfabd2d4d
