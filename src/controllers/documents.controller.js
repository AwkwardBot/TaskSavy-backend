const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentsService } = require('../services');


const uploadFile = catchAsync(async (req, res) => {

    await documentsService.handleFileUpload(req, res);

    res.status(httpStatus.NO_CONTENT).send()
});




module.exports = {
  uploadFile,
};

