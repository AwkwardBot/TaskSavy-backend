const express = require('express');
const projectController = require('../../controllers/project.controller');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger')

const router = express.Router();

router.post('/new', auth(),  )



module.exports = router;


/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task Management
 */

/**
 * @swagger
 * /tasks/new
 *   post:
 *     
 */