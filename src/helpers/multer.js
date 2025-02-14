const { error } = require("console");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, "data" + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb) {
    const allowedExtensions = ['.pdf', '.xls', '.xlsx', 'octet-stream'];
    const allowedMimeTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/octet-stream'];

    const extname = allowedExtensions.includes(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    try {
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('ERROR: ESTE CAMPO SOLO ADMITE ARCHIVOS CON EXTENSION XLSX, REGRESA AL PORTAL E INTRODUCE UN ARCHIVO VALIDO');
        }
    } catch (error) {
        console.log(error);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
