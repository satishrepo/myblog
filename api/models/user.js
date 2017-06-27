var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
{
	username : { type: String, unique: true, lowercase: true },
	email : { type: String, unique: true, lowercase: true },
	password : { type : String},
	// detail : [{type : mongoose.Schema.Types.ObjectId, ref:'user_detail'}]
});


var user_detailSchema = new mongoose.Schema(
{
	profile_pic : {type : String, default: ''},
	about : {type: String}
});


mongoose.model('user', userSchema);
// mongoose.model('user_details', user_detailSchema);

