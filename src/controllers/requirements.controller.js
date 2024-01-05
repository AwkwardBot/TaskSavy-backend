const httpStatus = require('http-status');
const {requirementsService} = require('../services');
const catchAsync = require('../utils/catchAsync');

exports.createRequirement = catchAsync(async (req, res) => {
        const { projectId } = req.params;
        
        req.body.projectId = projectId

        const newRequirement = await requirementsService.createRequirement(
            req.body
        );

        res.status(httpStatus.OK).json(newRequirement);
    
});

// Get requirements by projectId
exports.getRequirementsByProjectId = catchAsync(async (req, res) => {

        const { projectId } = req.params;

        const requirements = await requirementsService.getRequirementsByProjectId(projectId);

        res.status(200).json(requirements);

});

// Update a requirement
exports.updateRequirement = async (req, res) => {
    try {
        const { requirementId } = req.params;
        const updatedRequirement = req.body;

        const requirement = await requirementsService.updateRequirement(requirementId, updatedRequirement);

        res.status(200).json(requirement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a requirement
exports.deleteRequirement = async (req, res) => {
    try {
        const { requirementId } = req.params;

        await requirementsService.deleteRequirement(requirementId);

        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addRequirmentToModule = catchAsync(async(req, res)=> {

    const projectId = req.params.projectId;
    const moduleId = req.params.moduleId;
    const requirementBody = req.body

    const reqModule = requirementsService.addRequirmentToModule(requirementBody, moduleId, projectId)

    res.status(httpStatus.OK).send(reqModule)

})





