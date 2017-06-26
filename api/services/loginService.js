var mongoose = require('mongoose');
var logger = require('../../utils/logger');

module.exports = {

	doLogin : function(username, email, next)
	{
		try
		{
			mongoose.model('users').find({username:username,email:email}, function(err, result)
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
			logger.wlogger.log('error','userController-getAllUser - Error : '+e.toString())
			return next({status:'error', statusCode:500, data:e.toString()});
		}
		
	}
}