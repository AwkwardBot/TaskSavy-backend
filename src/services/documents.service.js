const multer = require('multer');
const fs = require('fs-extra');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    const projectId = req.params.projectId;

    
    fs.mkdirsSync(`./files/${projectId}/`);
    const uploadPath = `files/${projectId}/`;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

const handleFileUpload = (req, res) => {
    
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

const readFiles = async (projectId) => {
    
    const path = `files/${projectId}/`
    
    console.log(path)

    if (fs.existsSync(path)) {
        return files = fs.readdirSync(path, {
            withFileTypes: true
        })
    }

    return []

}


const deleteFile = async (projectId, file) => {

    const path = `files/${projectId}/${file}`

    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }

    throw new ApiError(httpStatus.NOT_FOUND, "Files does not exist")


}

module.exports = {
  handleFileUpload,
  readFiles,
  deleteFile
};
