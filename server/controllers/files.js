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
		   			workbook.Sheets[sheet] = excel.utils.sheet_to_json(workbook.Sheets[sheet], {header: 1});
		   		}

		   		for (sheet in workbook.Sheets){
		   			for (var i = 1; i < workbook.Sheets[sheet].length; i++){
		   				var maxLength = workbook.Sheets[sheet][0].length
		   				if (workbook.Sheets[sheet][i].length > maxLength)
		   					maxLength = workbook.Sheets[sheet][i].length;
		   			}
		   			for (var i = 0; i < workbook.Sheets[sheet].length; i++){
		   				while (workbook.Sheets[sheet][i].length != maxLength){
		   					workbook.Sheets[sheet][i].push(null)
		   				}
		   			}
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