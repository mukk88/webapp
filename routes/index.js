
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

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
