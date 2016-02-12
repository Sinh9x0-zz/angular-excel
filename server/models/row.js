var mongoose = require('mongoose');

var RowSchema = new mongoose.Schema({
	content: { type: Array },
	_Sheet: { type: mongoose.Schema.Types.ObjectId, ref: 'Sheet'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('Row', RowSchema);
