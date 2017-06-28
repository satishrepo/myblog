var loginAuth = function(req, res, next)
{
	if(req.session && req.session.username && req.session.userid)
	{
		return next();
	}
	res.redirect('/unauthorized');
}

module.exports = loginAuth;