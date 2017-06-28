var userService = require('../services/userService');

var user = {

	signUp : function(req, res)
	{
		res.format(
		{ 	
			html:function()
			{
				/*if(response.statusCode !== 200)
				{
					return res.render('error', {error:response.data});
				}*/
				return res.render('./user/signup', {title : 'signup'});
			},
			json:function()
			{
				return res.json({ data : 'Invalid Request'});
			}
		});
	
	},

	logIn : function(req, res)
	{ 
		res.format(
		{ 	
			html:function()
			{
				return res.render('./user/login', {title : 'login'});
			},
			json:function()
			{
				return res.json({ data : 'Invalid Request'});
			}
		});
	
	},

	userLogin : function(req, res)
	{
		var username_email = req.body.username;
		var password = req.body.password;

		userService.userAuthentication(username_email, password, function(response)
		{	
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					if(response.data.length > 0 )
					{
						req.session.userid = response.data[0]._id;
						req.session.username = response.data[0].username;
						return res.redirect('dashboard');						
					}
					
					return res.render('./user/login', {errorMessage:'Invalid Login Details.'});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	
	},

	getUser : function(req, res)
	{
		var userid = req.session.userid;

		userService.getUserById(userid, function(response)
		{	
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./user/dashboard', {user:response.data[0]});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},

	getUsers : function(req, res)
	{
		userService.getAllUsers(function(response)
		{	
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./user/users', {users:response.data});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},

	getUserDetail : function(req, res)
	{
		var username = req.query.username || req.params.username || req.body.username;

		userService.getUserDetail(username, function(response)
		{
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./user/detail', {detail:response.data});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	saveUser : function(req, res)
	{
		var user = {
			username : req.body.username,
			email : req.body.email,
			password : req.body.password,
		};
		
		userService.saveUser(user, function(response)
		{
			res.format(
			{
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}

					req.session.userid = response._id;
					req.session.username = response.username;

					res.redirect('/user/dashboard');
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	
	updateUserInfo : function(req, res)
	{
		var user = {
			user : req.body.userid,
			phone : req.body.phone,
			sex : req.body.sex,
		};

		userService.saveUser(user, function(response)
		{
			res.format(
			{
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					res.redirect('/users');
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	removeUser : function(req, res)
	{
		var email = req.body.email;

		userService.removeUser(email, function(response)
		{
			res.format(
			{
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					res.redirect('/users');
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},

};

module.exports = user;