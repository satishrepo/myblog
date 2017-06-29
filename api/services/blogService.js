var mongoose = require('mongoose');
var logger = require('../../utils/logger');

var blogModel = mongoose.model('post');

var blog = {

	getAllBlogs : function(next)
	{
		try
		{
			blogModel.find({}).populate('post_by').sort({created_at:-1}).exec(function(err, result)
			{
				if(err)
				{	
					return next({status:'error', statusCode:500, data:err});
				}
				return next({status:'OK', statusCode:200, data:result});
			});	
		}
		catch(e)
		{
			// logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	},

	getBlogBySlug : function(slug, next)
	{
		try
		{
			blogModel.find({slug:slug}).populate('post_by').exec(function(err, result)
			{
				if(err)
				{	
					return next({status:'error', statusCode:500, data:err});
				}
				return next({status:'OK', statusCode:200, data:result});
			});	
		}
		catch(e)
		{
			// logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	},

	saveBlog : function(blog, next)
	{
		if(typeof blog !== 'object')
		{
			return next({status:'error', statusCode:500, data:'Please send valid user object'});
		}

		try
		{
			blogModel.create(blog, function(err, result)
			{
				if(err)
				{
					return next({status:'error', statusCode:500, data:err});
				}

				return next({status:'OK', statusCode:200, data:result});
			});
		}
		catch(e)
		{
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	},

	checkSlug : function(slug, next)
	{
		try
		{
			blogModel.find({slug:slug}).exec(function(err, result)
			{
				if(err)
				{	
					return next({status:'error', statusCode:500, data:err});
				}
				return next({status:'OK', statusCode:200, data:result});
			});	
		}
		catch(e)
		{
			// logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	}
}

module.exports = blog;