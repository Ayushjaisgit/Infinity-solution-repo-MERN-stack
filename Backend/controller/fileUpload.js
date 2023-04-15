const multer = require('multer');
const mimeTypes = require('mime-types');

    const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('File type not supported.');
    error.statusCode = 400;
    return cb(error, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:/Code Playground/Task-1/Backend/uploads');
  },
  filename: (req, file, cb) => {
    const extension = mimeTypes.extension(file.mimetype);
    const fileName = `${Date.now()}.${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: fileFilter,
});

module.exports = upload;
