var mongoose = require('mongoose');
var logger = require('../../utils/logger');

var userModel = mongoose.model('user');


var user = {

	getAllUsers : function(next)
	{
		try
		{
			userModel.find({}, function(err, result)
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

	getUserById : function(userid, next)
	{
		try
		{
			userModel.find({_id : userid}, function(err, result)
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

	userAuthentication : function(username_email, password, next)
	{
		try
		{
			userModel.find({$and: [{$or:[{username:username_email},{email:username_email}]}, {password:password}]}, function(err, result)
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

	getUserDetail : function(username, next)
	{
		try
		{
			userModel.find({username:username}).populate('detail').exec(function(err, result)
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
			// logger.logger.log('userController-getAllUser - Error : '+e.toString());
			// logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	},
	saveUser : function(userObj, next)
	{
		if(typeof userObj !== 'object')
		{
			return next({status:'error', statusCode:500, data:'Please send valid user object'});
		}

		try
		{
			mongoose.model('user').create(userObj, function(err, result)
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

	removeUser : function(email, next)
	{
		try
		{
			userModel.find({email:email}, function(err, result)
			{
				if(err)
				{
					return next({status:'error', statusCode:500, data:err});
				}

				if(!result.length)
				{
					return next({status:'error', statusCode:400, data:'User not found.'});
				}

				result[0].remove(function(err, result1)
				{
					return next({status:'OK', statusCode:200, data:'User deleted successfully.'});
				});

			});	
		}
		catch(e)
		{
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	}
}

module.exports = user;