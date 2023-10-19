const httpStatus = require('http-status');
const { Workspace } = require('../models');
const ApiError = require('../utils/ApiError');


const createWorkspace = async (workspaceBody, userId) => {

    workspaceBody.members =  [
        {
          userId: userId,
          role: 'Admin',
        },
      ];

    return Workspace.create(workspaceBody) 

}



module.exports = {
    createWorkspace,

}