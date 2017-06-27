var mongoose = require('mongoose');

var postSchema = new mongoose.schema({

	title: {type: String, default: ''},
	slug: {type: String, default: ''},
	content: {type: String, default:''},
	categories: [],
	tags : [],
	published: {type: Boolean, default:true},
	created_at : {type: Date, default: Date.now},
	updated_at : {type: Date, default: Date.now},
	post_by : [{type : mongoose.Schema.Types.ObjectId, ref:'user'}],
	comments: [commentSchema]

});

var commentSchema = new mongoose.schema({

	comment_by : {type: mongoose.Schema.Types.ObjectId, ref : 'user', default: ''},
	text:{type: String, trim: true},
	created_at: {type: String }
});

mongoose.model('post', postSchema);
// mongoose.model('comments', commentSchema);