const express = require('express');
const httpStatus = require('http-status');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reqLog = require('../../middlewares/reqLogger');
const { projectController } = require('../../controllers');
const { projectValidation } = require('../../validations');
const { projectAccess, checkRole } = require('./../../middlewares/Access');

const router = express.Router({mergeParams: true});

const MANAGER = 'Manager';
const ADMIN = 'Admin';

router
    .route('/')
    .post(
        auth(),
        validate(projectValidation.createProject),
        projectController.createProject
    )
    .get(auth(), projectController.getProjects);
    


module.exports = router;

