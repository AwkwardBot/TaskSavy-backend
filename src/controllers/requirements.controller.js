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

exports.addRequirementToModule = catchAsync(async(req, res)=> {

    const {projectId, moduleId} = req.params
    const requirementBody = req.body

    const reqModule = await requirementsService.addRequirementToModule(projectId, moduleId, requirementBody)

    res.status(httpStatus.OK).send(reqModule)

})


exports.getRequirement = catchAsync(async(req, res)=> {

    const {projectId, moduleId, reqId} = req.params
    const requirement =  await requirementsService.getRequirementById(projectId, moduleId, reqId)
    res.status(httpStatus.OK).send(requirement)

})


exports.updateModule = catchAsync(async(req, res)=> {

    const {projectId, moduleId} = req.params;
    const updatedModule = await requirementsService.updateModuleById(projectId, moduleId, req.body)
    res.status(httpStatus.NO_CONTENT).send()

})


exports.deleteModule = catchAsync(async(req, res) => {

    const {projectId, moduleId} = req.params;
    await requirementsService.deleteModuleById(projectId, moduleId)
    res.status(httpStatus.NO_CONTENT).send()

})


exports.getModule = catchAsync(async (req, res) => {
     
    const {projectId, moduleId} = req.params;
    const reqModule = await requirementsService.getModuleById(projectId, moduleId)
    res.status(httpStatus.OK).send(reqModule)
})





