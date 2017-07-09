var express = require('express');
var router = express.Router();

var loginAuth = require('../middleware/loginAuth');

var blogController = require('../api/controllers/blogController');


router.get('/', blogController.getBlogs);
router.get('/add', loginAuth, blogController.addBlog);
router.post('/save', loginAuth, blogController.saveBlog);

router.get('/:slug', blogController.getBlog);

router.post('/comment', loginAuth, blogController.saveComment);



router.get('*', function(req, res)
{
	res.render('nopage');
});


module.exports = router;
