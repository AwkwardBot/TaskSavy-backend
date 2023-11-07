const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sendbirdService } = require('../services');


const getAllUsers = catchAsync(async (req, res) => {

    const allUsers = await sendbirdService.getAllUsers()

    
    if (allUsers.error) {
        throw new ApiError (httpStatus.BAD_REQUEST, allUsers.message )
    }

    console.log(allUsers)

    res.status(httpStatus.OK).send(allUsers.data.users)
});



module.exports = {
    getAllUsers


}