const multer = require('multer')
let storage  = multer.diskStorage({
  destination(req, file, cb) { cb(null, __dirname + '/../src/') },
  filename(req, file, cb) { cb(null, file.originalname) },
});

const upload = multer({ storage: storage }).array("picture");

module.exports = upload