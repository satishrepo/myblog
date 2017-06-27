var mongoose = require('mongoose');


var db = {

	model : '',

	query : {},
    update : { expire: new Date() },
    options : { upsert: true, new: true, setDefaultsOnInsert: true },

    setModel : function(model)
    {
    	this.model = model;
    },

    save : function(query, next)
    {
    	// Find the document
		/*Model.findOneAndUpdate(query, update, options, function(error, result) {
		    if (error) return;
		    // do something with the document
		});*/

		mongoose.model(this.model).findOneAndUpdate(query, this.update, this.options, function(err, res)
        {
            return next(err, res)
        })

		
    }
	

}

module.exports = db;