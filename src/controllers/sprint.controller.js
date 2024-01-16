const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sprintService } = require('../services');

const createSprint = catchAsync(async (req, res) => {

    // if(req.body.start_date)

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
        req.params.projectId,
        req.params.sprintId
        
    );
    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sprint not found');
    }
    res.status(httpStatus.OK).send(sprint);
});


const changeSprintStatus = catchAsync(async (req, res) => {

    const status = {status: req.body.status}
    const {projectId, sprintId} = req.params

    const sprint = await sprintService.updateSprint(projectId, sprintId, status)
    res.status(httpStatus.NO_CONTENT).send()

});

const updateSprint = catchAsync(async (req, res) => {

    const {projectId, sprintId} = req.params

    const sprint = await sprintService.updateSprint(projectId, sprintId, req.body)
    res.status(httpStatus.OK).send(sprint)

});

const deleteSprint = catchAsync(async (req, res) => {
    const sprint = await sprintService.deleteSprint(req.params.sprintId)
    res.status(httpStatus.NO_CONTENT).send()
});


module.exports = {
    createSprint,
    getSprints,
    getSprint,
    changeSprintStatus,
    updateSprint,
    deleteSprint
};
