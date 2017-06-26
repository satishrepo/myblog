var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
{
	username : { type: String, unique: true, lowercase: true },
	email : { type: String, unique: true, lowercase: true },
	detail : [{type : mongoose.Schema.Types.ObjectId, ref:'users_detail'}]
});


var user_detailSchema = new mongoose.Schema(
{
	phone : Number,
	sex : String,
});


mongoose.model('users', userSchema);
mongoose.model('users_detail', user_detailSchema);

