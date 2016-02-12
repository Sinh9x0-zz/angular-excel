var mongoose = require('mongoose');

var WorkbookSchema = new mongoose.Schema({
	name: { type: String, trim: true },
	sheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sheet'}],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('Workbook', WorkbookSchema);
