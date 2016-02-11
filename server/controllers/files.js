var mongoose = require('mongoose');

module.exports = (function() {
	return {
		sendFile: function(req, res) {
			console.log("reached server")
			console.log(req.body);
		}
	}

})();