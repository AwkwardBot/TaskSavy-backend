const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { workspaceService } = require('../services');
const httpStatus = require('http-status');


const createWorkspace = catchAsync(async (req, res) => {

  workspace = workspaceService.createWorkspace(req.body, req.user._id)
  res.status(httpStatus.CREATED).send(workspace)

});

const getWorkspaces = catchAsync(async (req, res) => {

    workspaces = workspaceService.getWorkspaces(req.user._id)
    res.status(httpStatus.OK).send(workspaces)

});

const getWorkspace = catchAsync(async (req, res) => {

    workspace = workspaceService.getWorkspace(req.params.workspaceId, req.user._id)

});

const addProject = catchAsync(async (req, res) => {});

const updateWorkspace = catchAsync(async (req, res) => {});

const removeProject = catchAsync(async (req, res) => {});

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  addProject,
  updateWorkspace,
  removeProject,
};
