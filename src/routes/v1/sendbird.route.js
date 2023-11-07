const express = require('express');
const auth = require('../../middlewares/auth');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');
const reqLog = require('../../middlewares/reqLogger');
const { sendbirdController } = require('../../controllers');


const router = express.Router();

router
    .route('/users')
    .get(sendbirdController.getAllUsers)



module.exports = router;
