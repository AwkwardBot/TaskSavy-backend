const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Project } = require('../models');

const projectAccess = async (req, res, next) => {
    
    const projectId = req.params.projectId
    const userId = req.user._id

    const project = await Project.findOne({ _id: projectId });

    console.log(project)
    
    if (!project) {
        return next(new ApiError(httpStatus.NOT_FOUND, "Project not Found"))
    }
    if (!project.members.some(member => member.userId.equals(userId))) {
        return next( new ApiError(httpStatus.FORBIDDEN, "You do not have permission to access this project") )
    }
    
    req.project = project;
    next()
}

const checkRole = (role) => (req, res, next) => {

    const project = req.project
    const userId = req.user._id

    if (role == 'Admin' && !project.members.some((member) => member.userId.equals(userId) && member.role === 'Admin')) {
        return next(new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to change active status'));
    }

    if (
        role == 'Manager' &&
        !project.members.some((member) => member.userId.equals(userId) && (member.role === 'Admin' || member.role === 'Manager'))
      ) {
        return next(new ApiError(httpStatus.FORBIDDEN, 'User does not have permission to change working status'));
      }
    
    next()

}

module.exports = {
    projectAccess,
    checkRole
}