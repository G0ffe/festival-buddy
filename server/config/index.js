exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://g0ffe:test1234@ds157682.mlab.com:57682/festivals';
exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/test-festival-app');
exports.PORT = process.env.PORT || 8080;