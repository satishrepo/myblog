var winston = require('winston');

var wlogger =  new (winston.Logger)(
{
    transports: [
      new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
      new (winston.transports.File)({ 
	      	filename: './logs/wdebug.log',
	      	handleExceptions: true,
	        json: true,
	        colorize: false
      	})
    ]
});

module.exports = wlogger;