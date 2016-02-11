var mongoose = require('mongoose');
var formidable = require('formidable');
var util = require('util');
var excel = require('xlsx');
var fs = require('fs')


module.exports = (function() {
	return {
		sendFile: function(req, res) {
			var form = new formidable.IncomingForm();
		   	form.parse(req, function(err, fields, files) {
		   		
		   		var workbook = excel.readFile(files.file.path);
		   		
		   		for (sheet in workbook.Sheets){
		   			workbook.Sheets[sheet] = excel.utils.sheet_to_csv(workbook.Sheets[sheet]);
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