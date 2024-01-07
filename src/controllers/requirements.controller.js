const httpStatus = require('http-status');
const {requirementsService} = require('../services');
const catchAsync = require('../utils/catchAsync');

exports.createRequirement = catchAsync(async (req, res) => {
        
    const { projectId } = req.params;
        
    req.body.projectId = projectId
    const newRequirement = await requirementsService.createRequirement(
        req.body
    );

    res.status(httpStatus.OK).send(newRequirement);
    
});


exports.getRequirementsByProjectId = catchAsync(async (req, res) => {

        const { projectId } = req.params;

        const requirements = await requirementsService.getRequirementsByProjectId(projectId);

        res.status(httpStatus.OK).send(requirements);

});

exports.updateRequirement = catchAsync(async (req, res) => {

    const { projectId, moduleId, reqId } = req.params;

    const requirement = await requirementsService.updateRequirement(projectId, moduleId, reqId, req.body);

    res.status(httpStatus.OK).send(requirement)

});


exports.deleteRequirement = catchAsync(async (req, res) => {

    const { projectId, moduleId, reqId } = req.params;
    await requirementsService.deleteRequirement(projectId, moduleId, reqId);
    res.status(httpStatus.NO_CONTENT).send();

});

exports.addRequirmentToModule = catchAsync(async(req, res)=> {

    const projectId = req.params.projectId;
    const moduleId = req.params.moduleId;
    const requirementBody = req.body

    const reqModule = await requirementsService.addRequirmentToModule(requirementBody, moduleId, projectId)

    res.status(httpStatus.OK).send(reqModule)

})


exports.getRequirement = catchAsync(async(req, res)=> {

    const projectId = req.params.projectId;
    const moduleId = req.params.moduleId;
    const reqId = req.params.reqId;

    const requirement =  await requirementsService.getRequirementById(projectId, moduleId, reqId)

    

    res.status(httpStatus.OK).send(requirement)

})





