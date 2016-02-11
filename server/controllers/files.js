var mongoose = require('mongoose');
var formidable = require('formidable');
var util = require('util');


module.exports = (function() {
	return {
		sendFile: function(req, res) {
			var form = new formidable.IncomingForm();

		   	form.parse(req, function(err, fields, files) {
		   	console.log(err);
		   	console.log(fields)
		   	console.log(files)
			  res.writeHead(200, {'content-type': 'text/plain'});
			  res.write('received upload:\n\n');
			  res.end(util.inspect({fields: fields, files: files}));
			});
		}
	}

})();