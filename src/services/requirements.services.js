const Requirements = require('../models/Requirements');

// Create a new requirement
const createRequirement = async (projectId, module_name, requirements) => {
    try {
        const newRequirement = await Requirements.create({ projectId, module_name, requirements });
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

module.exports = {
    createRequirement,
    getRequirementsByProjectId,
    updateRequirement,
    deleteRequirement,
};
