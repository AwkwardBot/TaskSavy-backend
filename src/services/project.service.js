const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new Project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 *
 */
const createProject = async (projectBody, userId) => {
    projectBody.members = [
        {
            userId,
            role: 'Admin'
        }
    ];

    return Project.create(projectBody);
};

/**
 * Return all projects of the authenticated user
 * @param {Object} userId
 * @returns {Array<Project>}
 */

const getProjects = async (userId) => {
    return Project.find({
        'members.userId': userId
    });
};

const updateProjectById = async (id) => {};

const deleteProject = async (projectId) => {

	const project = await Project.findByIdAndDelete(projectId);
	if (!project) {
		return false
	}

	return true


};

/**
 * Change the active status of a project.
 * @param {ObjectId} projectId
 * @param {ObjectId} userId
 * @param {ObjectId} status
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const changeActiveStatus = async (project, status) => {
    project.activeStatus = status;
    await project.save();
    return project;
};

/**
 * Change the working status of a project.
 * @param {ObjectId} projectId
 * @param {ObjectId} userId
 * @param {ObjectId} status
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const changeStatus = async (project, status) => {
    project.status = status;
    await project.save();
    return project;
};

/**
 * Get all the tags of a project
 * @param {Object} project
 * @returns {Promise<Project>}
 */

const getTags = async (project) => {
    return project.tags;
};

/**
 * Get a single tag
 * @param {Object} project
 * @param {Object} tag
 * @returns {Promise<Tag>}
 */

const getTag = async (project, tag) => {
    const tags = project.tags.find((t) => t.name === tag);

    if (!tags == -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tag does not exist');
    }

    return tags;
};

/**
 * Add a custom tag to the project
 * @param {*} projectId
 * @param {*} userId
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const addTag = async (project, tag) => {
    project.tags.push(tag);
    await project.save();
    return project;
};

/**
 * Remove a tag from the project
 * @param {*} project
 * @returns {Promise<Project>}
 */

const deleteTag = async (project, tag) => {
    project.tags = project.tags.filter((tags) => tags !== tag);
    await project.save();
    return project;
};

/**
 *
 * @param {*} projectId
 * @param {*} userId
 * @param {*} tagUpdate
 * @returns {Promise<Tag>}
 */

const updateTag = async (project, tagUpdate) => {
    const tag = await getTag(project, tagUpdate.old);
    console.log(tag);
    tag.name = tagUpdate.new;
    console.log('updated: ', tag);
    project.save();
    console.log(project);
    return tag;
};

const getMembers = async (project) => {
    return project.members;
};

const getMemberById = async (project, memberId) => {
    return project.members.find((m) => m.id === memberId);
};

const addMember = async (project, members) => {
    for (var member in members) {
        project.members.push({ userId: member.id, role: member.role });
    }

    await project.save();
    return project;
};

const searchMemberByName = async (project, name) => {
    return project.members.find((m) => m.name === name);
};

const queryProject = async () => {
    const projects = await Project.paginate(filter, options);
    return projects;
};

module.exports = {
    createProject,
    getProjects,
	deleteProject,
    changeActiveStatus,
    changeStatus,
    getTags,
    addTag,
    deleteTag,
    getTag,
    updateTag,
    getMembers,
    getMemberById,
    addMember,
    updateProjectById
};
