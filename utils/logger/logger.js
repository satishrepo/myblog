var fs = require('fs');
var util = require('util');
var logger = {

	log : function(content)
	{
		var log_file = fs.createWriteStream('./logs/debug.log', {flags:'a'});

		var date = new Date().toISOString();

		log_file.write('\n-----------------------------------------------------------\n');
		log_file.write(util.format('LOGGED['+date+'] - ' +content));

		log_file.on('finish', function() 
		{
		    console.log("Write completed.");
		});

		log_file.on('error', function(err)
		{
		   console.log(err.stack);
		});
	}
};

module.exports = logger;