var files = require('./../controllers/files.js');

module.exports = function(app) {
	app.post('/sendFile', function(req, res) {
		files.sendFile(req, res);
	});
};