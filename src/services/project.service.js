const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new Project
 * @param {Object} projectBody 
 * @returns {Promise<Project>}
 * 
 */
const createProject = async (projectBody, user) => {

  const adminMember = {
      userId: user._id, 
      role: 'Admin',
  };
  projectBody.members = [adminMember];

  return Project.create(projectBody);
};

/**
 * Retuen all projects of the authenticated user
 * @param {Object} userId 
 * @returns {Array<Project>} 
 */

const getProjects = async (userId) => {

  return projects = await Project.find({
    'members.userId': userId,
  })
}
 

/**
 * 
 * @param {Object} projectId 
 * @param {Object} userId 
 * @returns {Promise<Project>}
 */

const getProjectById = async (projectId, userId) => {
  const project = Project.findOne({
    '_id': projectId,
    'members.userId': userId,
  });
  if (!project){
    throw new ApiError(httpStatus.NOT_FOUND, 'Project does not exist');
  }

  return project
}


const updateProjectById = async (id) => {
  
}


/**
 * Change the active status of a project.
 * @param {ObjectId} projectId 
 * @param {ObjectId} userId 
 * @param {ObjectId} status 
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const changeActiveStatus = async (projectId, userId, status) => {

  const project = await getProjectById(projectId, userId)
  if(!project){
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found or user does not have access to the project');
  }
  console.log(project)
  if (!project.members.some(member => member.userId.equals(userId) && member.role === 'Admin')){
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to change active status ');
    
  }

    project.activeStatus = status
    await project.save()
    return project

}

/**
 * Change the working status of a project.
 * @param {ObjectId} projectId 
 * @param {ObjectId} userId 
 * @param {ObjectId} status 
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const changeStatus = async (projectId, userId, status) => {
  const project = await getProjectById(projectId, userId)
  if(!project){
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found or user does not have access to the project');
  }
  if (!project.members.some(member => member.userId.equals(userId) && (member.role === 'Admin' || member.role === 'Manager'))){
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to change working status ');
    
  }

    project.status = status
    await project.save()
    return project

}

/**
 * 
 * @param {Object} projectId 
 * @param {Object} userId 
 * @returns {Promise<Project>}
 */

const getTags = async (projectId, userId) => {

  const project = await getProjectById(projectId, userId)
  console.log("project: ", project)
  return project.tags

}

const getTag = async (projectId, userId, tag) => {

  const project = await getProjectById(projectId, userId)
  
  return project.tags.find(t => t.name === tag);


}

/**
 * Add a custom tag to the project
 * @param {*} projectId 
 * @param {*} userId 
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const addTag = async (projectId, userId, tag) => {

  const project = await getProjectById(projectId, userId)

  if (project.members.some(member => member.userId.equals(userId) && member.role === 'Member')){
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to add tags');
  }

  project.tags.push(tag);
  await project.save();
  return project;

}

/**
 * Remove a tag from the project
 * @param {*} projectId 
 * @param {*} userId 
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */


const removeTag = async (projectId, userId, tag) => {

  const project = await getProjectById(projectId, userId)

  if (project.members.some(member => member.userId.equals(userId) && member.role === 'Member')){
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to remove tags');
  }

  project.tags = project.tags.filter(tags => tags !== tag)
  await project.save();
  return project;

 };

const updateTag = async (projectId, userId, tagUpdate) => {

  const project = await getProjectById(projectId, userId)

  if (!project){
    throw new ApiError(httpStatus.NOT_FOUND, 'Project does not exist');
  }

  if (project.members.some(member => member.userId.equals(userId) && member.role === 'Member')){
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to edit tags');
  }

  const tag =await getTag(projectId, userId, tagUpdate.old)
  if (!tag == -1){
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag does not exist');
  }

  console.log(tag)

  tag.name = tagUpdate.new
  console.log("updated: ", tag)
  project.save()
  console.log(project)
  return tag

};


module.exports = {
  createProject,
  getProjects,
  getProjectById,
  changeActiveStatus,
  changeStatus,
  getTags,
  addTag,
  removeTag,
  getTag,
  updateTag

};
