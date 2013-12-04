
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};


exports.splash = function(req, res){
  res.render('splash.html');
};

exports.pitch = function(req, res){
  res.render('pitch.html');
};

exports.game = function(req, res){
  res.render('game.html');
};


exports.authFacebook = function(req, res){
  // should never be called
};

exports.authFacebookCallback = function(req, res){
  res.redirect('/index');
};

exports.play = function(red, res){
	res.render('play.html');
}

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};