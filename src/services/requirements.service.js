const {Requirements} = require('../models');
const ApiError = require('../utils/ApiError');
// Create a new requirement
const createRequirement = async (reqBody) => {
    try {
        const newRequirement = await Requirements.create(reqBody);
        return newRequirement;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get requirements by projectId
const getRequirementsByProjectId = async (projectId) => {
    try {
        const requirements = await Requirements.find({ projectId });
        return requirements;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update a requirement
const updateRequirement = async (requirementId, updatedRequirement) => {
    try {
        const requirement = await Requirements.findByIdAndUpdate(
            requirementId,
            { $set: updatedRequirement },
            { new: true }
        );
        return requirement;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Delete a requirement
const deleteRequirement = async (requirementId) => {
    try {
        await Requirements.findByIdAndRemove(requirementId);
    } catch (err) {
        throw new Error(err.message);
    }
};

const addRequirmentToModule = async (requirementBody, moduleId, projectId) => {

    const reqModule = await Requirements.findOne({'_id': moduleId, 'projectId': projectId})
    reqModule.requirements.push(requirementBody)
    reqModule.save()
    return reqModule
    

}


const getRequirementsModuleById = async(moduleId) => {

}





module.exports = {
    createRequirement,
    getRequirementsByProjectId,
    updateRequirement,
    deleteRequirement,
    addRequirmentToModule
};
