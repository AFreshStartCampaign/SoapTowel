//npm install formidable
//npm install quickthumb
//npm install fs-extra
// auto-resize = ...your-uploaded-file-name?dim=200, where dim = width in px

var express = require("express"), 
  app = express(),
  formidable = require('formidable'),
  util = require('util'),
  fs   = require('fs-extra'),
  qt   = require('quickthumb');

// Use quickthumb
app.use(qt.static(__dirname + '/'));

// file upload
app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    // file upload and temp path
    var upload = this.openedFiles[0];
    var temp_path = upload.path;
    // file name
    var userID = "stormpath-id"; // TODO:: Stormpath ID
    var ext = upload.name.substring(upload.name.lastIndexOf('.') + 1) 
    var file_name = userID + "." + ext; 
    // destination
    var destination = 'public/img/shelter_img/';
    // upload file
    fs.copy(temp_path, destination + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});

// Show the upload form 
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  // TODO: filetype verification
  //res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script> <script src="check_image.js"></script>');
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">\
  Add a title: <input name="title" type="text" /><br><br>\
  <input multiple="multiple" name="upload" type="file" /><br><br>\
  <input type="submit" value="Upload" /></form>';
  res.end(form); 
}); 

app.listen(8080);