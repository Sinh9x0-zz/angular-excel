var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, './client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var server = app.listen(2200);


// var formidable = require('formidable'),
//     http = require('http'),
//     util = require('util');

// http.createServer(function(req, res) {
//   if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
//     // parse a file upload
//     var form = new formidable.IncomingForm();

//     form.parse(req, function(err, fields, files) {
//       res.writeHead(200, {'content-type': 'text/plain'});
//       res.write('received upload:\n\n');
//       res.end(util.inspect({fields: fields, files: files}));
//     });

//     return;
//   }

//   // show a file upload form
//   res.writeHead(200, {'content-type': 'text/html'});
//   res.end(
//     '<form action="/upload" enctype="multipart/form-data" method="post">'+
//     '<input type="text" name="title"><br>'+
//     '<input type="file" name="upload" multiple="multiple"><br>'+
//     '<input type="submit" value="Upload">'+
//     '</form>'
//   );
// }).listen(8080);
