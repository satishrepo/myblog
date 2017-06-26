How to create log -

	1. For custome logger
		1.1) var logger = require('../utils/logger');
		1.2) logger.logger.log('this is log message');

	2. For winston logger
		1.1) var logger = require('../utils/logger');
		1.2) logger.slogger.log('info','this is log message');