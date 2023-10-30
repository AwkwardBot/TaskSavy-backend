const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {

    task = taskService.createTask(req.body)

});

const getTasks = catchAsync(async (req, res) => {});

const getTasksBySprint = catchAsync(async (req, res) => {});

const getTaskById = catchAsync(async (req, res) => {});

const updateTask = catchAsync(async (req, res) => {});

const changeTaskStatus = catchAsync(async (req, res) => {});

const getAssignee = catchAsync(async (req, res) => {});

const addAssignee = catchAsync(async (req, res) => {});

const removeAssignee = catchAsync(async (req, res) => {});

module.exports = {
  createTask,
  getTasks,
  getTasksBySprint,
  getTaskById,
  updateTask,
  changeTaskStatus,
  getAssignee,
  addAssignee,
  removeAssignee,
};
