const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { workspaceService } = require('../services');


const createWorkspace = catchAsync(async (req, res) => {

    


});

const getWorkspaces = catchAsync(async (req, res) => {})

const getWorkspace = catchAsync(async (req, res) => {})

const addProject = catchAsync(async (req, res) => {})


const updateWorkspace = catchAsync(async (req, res) => {})

const removeProject = catchAsync(async (req, res) => {})



module.exports = {
    createWorkspace,
    getWorkspaces,
    getWorkspace,
    addProject,
    updateWorkspace,
    removeProject

}