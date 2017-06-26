var loginService = require('../services/loginService');

module.exports = {
	login : function(req, res)
	{
		if(req.method.toUpperCase() == 'GET')
		{
			res.render('./login/login', {data:'Please Enter Login Credentials'});
		}
		else if(req.method.toUpperCase() == 'POST')
		{
			var username = req.body.username;
			var email = req.body.email;

			loginService.doLogin(username, email, function(response)
			{
				res.format(
				{ 	
					html:function()
					{
						if(response.statusCode !== 200)
						{
							return res.render('error', {error:response.data});
						}

						req.session.username = username;
						
						return res.redirect('/users');
					},
					json:function()
					{
						return res.json(response);
					}
				});
			});
		}
		else
		{
			return rew.json({status:'OK', statusCode:500, data:'Invalid Method'});
		}
	},
}