const requirementsService = require('../services/requirementsService');

// Create a new requirement
exports.createRequirement = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { module_name, requirements } = req.body;

        const newRequirement = await requirementsService.createRequirement(
            projectId,
            module_name,
            requirements
        );

        res.status(201).json(newRequirement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get requirements by projectId
exports.getRequirementsByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;

        const requirements = await requirementsService.getRequirementsByProjectId(projectId);

        res.status(200).json(requirements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
