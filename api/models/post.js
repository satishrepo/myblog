var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({

	comment_by : {type: mongoose.Schema.Types.ObjectId, ref : 'user', default: ''},
	text:{type: String, trim: true},
	created_at: {type: String }
});

var postSchema = new mongoose.Schema({

	title: {type: String, default: ''},
	slug: {type: String, default: ''},
	content: {type: String, default:''},
	image: {type: String, default:'default.jpg'},
	categories: [],
	tags : [],
	published: {type: Boolean, default:true},
	created_at : {type: Date, default: Date.now},
	updated_at : {type: Date, default: Date.now},
	post_by : [{type : mongoose.Schema.Types.ObjectId, ref:'user'}],
	comments: [commentSchema]

});


mongoose.model('post', postSchema);
// mongoose.model('comments', commentSchema);