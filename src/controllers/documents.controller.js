const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentsService } = require('../services');


const uploadFile = catchAsync(async (req, res) => {

    await documentsService.handleFileUpload(req, res);

    res.status(httpStatus.NO_CONTENT).send()
});

const readFiles = catchAsync(async (req, res) => {

    const files = await documentsService.readFiles(req.params.projectId)
    
    res.status(httpStatus.OK).send(files)
})

const deleteFile = catchAsync(async (req,res)=>{



    await documentsService.deleteFile(req.params.projectId, req.body.file)
    res.status(httpStatus.NO_CONTENT).send()
})



module.exports = {
  uploadFile,
  readFiles,
  deleteFile
};

