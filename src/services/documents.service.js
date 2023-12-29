const multer = require('multer');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get the project ID from the request body or query parameters
    const projectId = req.params.projectId;

    // Define the destination folder based on the project ID
    const uploadPath = `uploads/${projectId}/`;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

const handleFileUpload = (req, res) => {
    console.log(req.data)
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        reject('Error uploading file.');
      } else if (err) {
        reject('Something went wrong.');
      } else {
        resolve('File uploaded successfully.');
      }
    });
  });
};

module.exports = {
  handleFileUpload,
};


module.exports = {
  handleFileUpload,
};
