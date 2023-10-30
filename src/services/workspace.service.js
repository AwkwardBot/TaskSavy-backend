const httpStatus = require('http-status');
const { Workspace } = require('../models');
const ApiError = require('../utils/ApiError');

const createWorkspace = async (workspaceBody, userId) => {
  workspaceBody.members = [
    {
      userId,
      role: 'Admin',
    },
  ];

  return Workspace.create(workspaceBody);

  


};


const getWorkspaces = async () => {




};

const getWorkspace = async () => {};




module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace
};
