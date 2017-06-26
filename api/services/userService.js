var mongoose = require('mongoose');
var logger = require('../../utils/logger');

var user = {

	getAllUsers : function(next)
	{
		try
		{
			mongoose.model('users').find({}, function(err, result)
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
			logger.logger.log('userController-getAllUser - Error : '+e.toString());
			logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	},
	getUserDetail : function(username, next)
	{
		try
		{
			mongoose.model('users').find({username:username}).populate('detail').exec(function(err, result)
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
			logger.logger.log('userController-getAllUser - Error : '+e.toString());
			logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
	},
	saveUser : function(userObj, detailObj, next)
	{
		if(typeof detailObj !== 'object')
		{
			return next({status:'error', statusCode:500, data:'Please send valid user object'});
		}

		try
		{
			mongoose.model('users_detail').create(detailObj, function(err, result)
			{
				if(err)
				{
					return next({status:'error', statusCode:500, data:err});
				}

				if(typeof userObj !== 'object')
				{
					return next({status:'OK', statusCode:200, data:'User saved successfully.'});
				}

				userObj.detail = result._id;

				mongoose.model('users').create(userObj, function(err, result)
				{
					if(err)
					{
						return next({status:'error', statusCode:500, data:err});
					}

					return next({status:'OK', statusCode:200, data:'User saved successfully.'});
				});

				// return next({status:'OK', statusCode:200, data:'User saved successfully.'});
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
			mongoose.model('users').find({email:email}, function(err, result)
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