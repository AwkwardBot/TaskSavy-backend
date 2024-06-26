const httpStatus = require('http-status');
const { Sprint } = require('../models');
const ApiError = require('../utils/ApiError');
const ticketService = require('./ticket.service');

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

const getSprints = async (projectId) => {
    const sprints = await Sprint.find({
        projectId: projectId  
    });
    return sprints;
};

/**
 * Get Sprint By Id
 * @param {Object} sprintId
 * @param {Object} projectId
 * @param {Object} userId
 * @returns {Promise<Sprint>}
 */

const getSprintById = async (projectId, sprintId) => {

    const sprint = Sprint.findOne({
        _id: sprintId,
        projectId: projectId
    });

    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sprint does not exist');
    }

    return sprint;
};


const updateSprint = async(projectId, sprintId, body) => {
    const sprint = await Sprint.findOne({_id: sprintId, projectId: projectId})
    if(!sprint)
        throw new ApiError(httpStatus.NOT_FOUND, "Sprint does not exist");

    Object.assign(sprint, body);
    await sprint.save()
    return sprint
}



const deleteSprint = async(sprintId) =>{

    const sprint = await Sprint.findById(sprintId)
    if(!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, "Sprint does not exist");
    }
    await ticketService.removeSprint(sprintId)
    await sprint.remove()
    
    return sprint
}
module.exports = {
    createSprint,
    getSprints,
    getSprintById,
    updateSprint,
    deleteSprint
};
