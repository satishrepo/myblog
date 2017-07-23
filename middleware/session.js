var sess = function(req, res, next)
{
	// console.log(req.headers);
	res.locals.session = req.session;
	
	return next();
}

module.exports = sess;
