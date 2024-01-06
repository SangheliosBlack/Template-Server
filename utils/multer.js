var multer = require("multer");
var path = require("path");


var storage = multer.diskStorage({
  
    destination:function(req,file,cb){
      cb(null, "public/uploads");
    },filename:function(req,file,cb){
      
        cb(null, "image" + '-' + Date.now() + file.originalname);
    }
});

function checkFileType(file, cb) {  
  const filetypes = /png|jpg|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    
    return cb(null, true);
  } else {
    cb('ERROR: ESTE CAMPO SOLO ADMITE ARCHIVOS CON EXTENSION PNG,JPG Y JPEG, REGRESA AL PORTAL E INTRODUCE UN ARCHIVO VALIDO ');
  }
}

var upload = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
});

module.exports = upload;