var mongoose = require('mongoose');

var SheetSchema = new mongoose.Schema({
	name: { type: String, trim: true },
	_Workbook: { type: mongoose.Schema.Types.ObjectId, ref:'Workbook'},
	rows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Row'}],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('Sheet', SheetSchema);
