var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myblog');


if(mongoose.connection.readyState == 0)
{
	console.log('Connection Error');
	return 
}
