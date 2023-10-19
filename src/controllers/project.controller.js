const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getProjects(req.user._id);
  if (!projects) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Projects');
  }

  res.send(projects);
});

const getProject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId, req.user._id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

const changeActiveStatus = catchAsync(async (req, res) => {
  const project = await projectService.changeActiveStatus(req.params.projectId, req.user._id, req.body.status);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  res.status(httpStatus.NO_CONTENT).send();
});

const changeStatus = catchAsync(async (req, res) => {
  const project = await projectService.changeStatus(req.params.projectId, req.user._id, req.body.status);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  res.status(httpStatus.NO_CONTENT).send();
});

const getTags = catchAsync(async (req, res) => {
  const tags = await projectService.getTags(req.params.projectId, req.user._id);

  if (!tags) {
    throw new ApiError('httpStatus.NOT_FOUND', 'No tags found');
  }

  res.send(tags);
});

const addTag = catchAsync(async (req, res) => {
  const tags = await projectService.addTag(req.params.projectId, req.user._id, req.body.tag);

  res.send(tags);
});

const deleteTag = catchAsync(async (req, res) => {
  await projectService.deleteTag(req.params.projectId, req.user._id, req.body.tag);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateTag = catchAsync(async (req, res) => {
  const tag = await projectService.updateTag(req.params.projectId, req.user._id, req.body);
  res.send(tag);
});

const getBoards = catchAsync(async (req, res) => {
  const boards = await projectService.getBoards();

  if (!boards) {
    throw new ApiError('httpStatus.NOT_FOUND', 'No boards found');
  }

  res.send(boards);
});

const getBoard = catchAsync(async (req, res) => {});

const addBoard = catchAsync(async (req, res) => {
  // const boards = await projectService.addTag(req.params.projectId, req.user, req.body.tag)
  // res.send(tags)
});

const removeBoard = catchAsync(async (req, res) => {
  await projectService.removeTag(req.param.projectId, req.user._id, req.body.board);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateBoard = catchAsync(async (req, res) => {});

const getMembers = catchAsync(async (req, res) => {
  await projectServices;
});

const addMembers = catchAsync(async (req, res) => {
  for (member in req.body.members) {
    await projectService.addMember(req.user._id, member);
  }
  res.status(httpStatus.NO_CONTENT).send();
});

const getMemberById = catchAsync(async (req, res) => {});

const deleteMember = catchAsync(async (req, res) => {});

const changeMemberRole = catchAsync(async (req, res) => {});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  changeActiveStatus,
  changeStatus,
  getTags,
  addTag,
  deleteTag,
  getBoards,
  getBoard,
  addBoard,
  removeBoard,
  updateBoard,

  updateTag,

  getMembers,
  addMembers,
  getMemberById,
  deleteMember,
  changeMemberRole,
};
