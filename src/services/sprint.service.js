const httpStatus = require('http-status');
const { Sprint } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new Sprint
 * @param {Object} sprintBody
 * @param {Object} userId
 * @param {Object} projectId
 * @returns {Promise<Sprint>}
 */

const createSprint = async (sprintBody, projectId) => {
    sprintBody.projectId = projectId;
    return Sprint.create(sprintBody);
};

/**
 * Get all sprints of a project
 * @param {*} userId
 * @param {*} projectId
 * @return {Array<Sprint>}
 */

const getSprints = async (userId, projectId) => {
    const sprints = await Sprint.find({
        projectId
    });

    return sprints;
};

/**
 * Get Sprint By Id
 * @param {Obejct} sprintId
 * @param {Obejct} projectId
 * @param {Obejct} userId
 * @returns {Promise<>}
 */

const getSprintById = async (sprintId, projectId, userId) => {

    const sprint = Sprint.findOne({
        _id: sprintId
    });

    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sprint does not exist');
    }

    return sprint;
};

module.exports = {
    createSprint,
    getSprints,
    getSprintById
};
