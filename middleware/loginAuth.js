var loginAuth = function(req, res, next)
{
	if(req.session && req.session.username)
	{
		return next();
	}
	res.redirect('/unauthorized');
}

module.exports = loginAuth;