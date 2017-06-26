var express = require('express');
var router = express.Router();

var loginAuth = require('../middleware/loginAuth');

var userController = require('../api/controllers/userController');

// router.get('/', userController.getUsers);
router.get('/list', userController.getUsers);
// router.get('/:username', userController.getUserDetail);
router.get('/detail/:username', userController.getUserDetail);
router.post('/', loginAuth, userController.saveUser);
router.delete('/', loginAuth, userController.removeUser);


/********* API Routing (if want to make different routing) ******************/

router.get('/detail/:username?', userController.getUserDetail);


/********************** API Routing END ******************/



module.exports = router;



// var mongoose = require('mongoose');

/*router.route('/')
.get(function(req, res, next)
{
	mongoose.model('users').find({},function(err,result)
	{
		if(err)
		{
			console.log(err);
			return;
		}
		res.format(
		{
			html:function()
			{
				return res.render('users', {users:result});
			},
			json:function()
			{
				return res.json({users:result});
			}
		})
	})
})
.post(function(req, res, next)
{
	var email = req.body.email;
	var name = req.body.name;

	mongoose.model('users').create(
	{
		email : email,
		name : name
	},
	function(err, result)
	{
		if(err)
		{
			console.log(err);
			return;
		}

		res.format(
		{
			html: function()
			{
				res.location('users');
				res.redirect('/users');
			}
		})
	})	
})
.delete(function(req, res)
{
	var email = req.body.email;

	mongoose.model('users').find({email:email}, function(err, result)
	{
		if(err)
		{
			console.log(err);
			return
		}
		if(!result.length)
		{
			console.log('Data not fund with this email');
			res.redirect('/users');	
			return;
		}
		result[0].remove(function(err1, data)
		{
			console.log('deleted');
			res.redirect('/users');
		})
	});
});
module.exports = router;
*/

