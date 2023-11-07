const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sprintService } = require('../services');

const createSprint = catchAsync(async (req, res) => {
    const sprint = await sprintService.createSprint(
        req.body,
        req.params.projectId
    );
    
    res.status(httpStatus.CREATED).send(sprint);
});

const getSprints = catchAsync(async (req, res) => {
    const sprints = await sprintService.getSprints(
        req.params.projectId
    );
    

    if (!sprints) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Sprints');
    }

    res.status(httpStatus.OK).send(sprints);
});

const getSprint = catchAsync(async (req, res) => {
    const sprint = await sprintService.getSprintById(
        req.params.sprintId,
        req.params.projectId,
        req.user._id
    );
    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    console.log(sprint);
    res.status(httpStatus.OK).send(sprint);
});


const changeSprintStatus = catchAsync(async (req, res) => {});

const updateSprint = catchAsync(async (req, res) => {});

const deleteSprint = catchAsync(async (req, res) => {});


module.exports = {
    createSprint,
    getSprints,
    getSprint,
    changeSprintStatus,
    updateSprint,
    deleteSprint
};
