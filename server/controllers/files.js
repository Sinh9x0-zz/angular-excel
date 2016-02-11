var mongoose = require('mongoose');
var formidable = require('formidable');
var excel = require('xlsx');

module.exports = (function() {
	return {
		sendFile: function(req, res) {
			var form = new formidable.IncomingForm();
		   	form.parse(req, function(err, fields, files) {
		   		var workbook = excel.readFile(files.file.path);
		   		
		   		for (sheet in workbook.Sheets){
		   			console.log(workbook.Sheets[sheet] )
		   			workbook.Sheets[sheet] = excel.utils.sheet_to_json(workbook.Sheets[sheet], {header: 1});
		   		}

		   		var myExcel = {
		   			sheets: workbook.SheetNames, 
		   			content: workbook.Sheets
		   		}

		   		res.json(myExcel);
			});
		}
	}
})();