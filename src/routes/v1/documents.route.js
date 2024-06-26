const express = require('express');
const auth = require('../../middlewares/auth');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');
const reqLog = require('../../middlewares/reqLogger');
const { documentsController } = require('../../controllers');
const { sprintValidation, projectValidation } = require('../../validations');


const router = express.Router({mergeParams: true})


const MANAGER = 'Manager';
const ADMIN = 'Admin';

router
    .route('/')
    .post(
    
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        documentsController.uploadFile
    )
    .get(
        auth(),
        
        validate(projectValidation.projectId),
        projectAccess,
        documentsController.readFiles
    )
    .patch(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        documentsController.deleteFile
    )


router
        .route('/:file')
        

module.exports = router;
