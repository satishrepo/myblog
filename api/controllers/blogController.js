var blogService = require('../services/blogService');
var helpers = require('../../utils/helpers');
var multer = require('multer');
var async = require('async');

var storage = multer.diskStorage(
{
	destination : function(req, file, callback)
	{
		callback(null, './assets/images/uploads/');
	},
	filename : function(req, file, callback)
	{
		callback(null, Date.now()+file.originalname);
	}
});

var upload = multer({storage:storage}).single('postpic');


var user = {

	getBlogs : function(req, res)
	{
		blogService.getAllBlogs(function(response)
		{	
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./blog/blogs', {blogs:response.data, imageUrl:'/images/uploads/'});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},

	getBlog : function(req, res)
	{
		var slug = req.params.slug;

		blogService.getBlogBySlug(slug, function(response)
		{	
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./blog/post', {post:response.data[0], imageUrl:'/images/uploads/'});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},

	addBlog : function(req, res)
	{
		res.format(
		{ 	
			html:function()
			{
				return res.render('./blog/add-blog', {title:'add Blog'});
			},
			json:function()
			{
				return res.json({title:'invalid request'});
			}
		});
	
	},

	saveBlog : function(req, res)
	{
		upload(req, res, function(error)
		{
			if(error)
			{
				console.log(error);
			}

			var slug = helpers.slugify(req.body.title);

			var blog = {
				title : req.body.title,
				slug :  slug,
				content : req.body.content,
				image : req.file.filename,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				post_by: req.session.userid,
			};

			async.series([
				function(done)
				{

					blogService.checkSlug(slug, function(resp)
					{
						if(resp.statusCode == 200)
						{
							blog.slug = resp.data.length > 0 ? slug + '-' + (resp.data.length + 1) : slug;
							done();
						}
						else
						{
							return res.render('error', {error:resp.data});
						}
					})
				},
				function(done)
				{
					blogService.saveBlog(blog, function(response)
					{
						res.format(
						{
							html:function()
							{
								if(response.statusCode !== 200)
								{
									return res.render('error', {error:response.data});
								}

								res.redirect('/blog');
								// done();
							},
							json:function()
							{
								return res.json(response);
							}
						});
					});
					
				}
			], 
			function(err) 
			{
			  console.log(err); 
			  return res.render('error', {error:err});
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