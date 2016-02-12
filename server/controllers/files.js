var mongoose = require('mongoose');
var Workbook = mongoose.model('Workbook');
var Sheet = mongoose.model('Sheet');
var Row = mongoose.model('Row');

var formidable = require('formidable');
var excel = require('xlsx');

module.exports = (function() {
	return {
		sendFile: function(req, res) {

			var form = new formidable.IncomingForm();
		   	form.parse(req, function(err, fields, files) {

		   		if (files.file === undefined) {
		   			res.status(200).send('no file selected');
		   		} else if (files.file.type.slice(-5) !== 'sheet' && files.file.type.slice(-5) != "excel") {
		   			res.status(406).send({ error: 'Only excel files are accepted' })
		   		} else {
			   		var workbook = excel.readFile(files.file.path);
			   		var workbookName = form.openedFiles[0].name

			   		for (sheet in workbook.Sheets){
			   			workbook.Sheets[sheet] = excel.utils.sheet_to_json(workbook.Sheets[sheet], {header: 1});
			   		}

			   		/* populates empty cells for client-side table view	 */
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

			   		var newWorkbook = new Workbook({ name: workbookName })
			   		newWorkbook.save(function(err, workbookData){
				 		for(sheet in workbook.Sheets){
				 			saver(workbookData._id, sheet);
				 		}
				 	});

			   		/* saves into database and deal with asynchronous for loop */
			   		var saver = function(workbookID, sheet){
			   			var newSheet = new Sheet({
			   				name: sheet,
			   				_Workbook: workbookID
			   			})

			   			newSheet.save(function(err, sheetData){
			   				var newRow = new Row({
								content: workbook.Sheets[sheet],
								_Sheet: sheetData._id
							});	

							newRow.save(function(err, rowData){
								Sheet.update({_id: rowData._Sheet}, {$push: {rows: rowData.id}}, function(err, res){
									Workbook.update({_id: workbookID}, {$push: {sheets: sheetData.id}}, function(err, res){
										if(err){
											console.log(err);
										}
									})
								})
							})
			   			})			   			
				   	}

			   		var myExcel = {
			   			sheets: workbook.SheetNames, 
			   			content: workbook.Sheets
			   		}

			   		res.json(myExcel);
			   	}
			});
		}, 
		getAll: function(req, res){
			/* returns json object with all workbooks, sheets, and rows */
			Workbook.find({}).populate('sheets').exec(function(err, workbooks){
				if (err) {
					res.json(err)
				} else {
					Row.populate(workbooks, 'sheets.rows',function(err, results){
						res.json(results);
					})
				}
			})
		}
	}
})();