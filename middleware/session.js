var sess = function(req, res, next)
{
	res.locals.session = req.session;
	return next();
}

module.exports = sess;
