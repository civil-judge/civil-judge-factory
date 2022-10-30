var multer = require("multer");

var imagePath = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/images");
  },
  filename: (req, file, path) => {
    path(null, file.originalname);
  },
});

var pdfPath = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/pdf");
  },
  filename: (req, file, path) => {
    path(null, file.originalname);
  },
});

var videoPath = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/videos");
  },
  filename: (req, file, path) => {
    path(null, file.originalname);
  },
});

var uploadImage = multer({ storage: imagePath });
var uploadPdf = multer({ storage: pdfPath });
var uploadVideo = multer({ storage: videoPath });

module.exports = { uploadImage, uploadPdf, uploadVideo };
