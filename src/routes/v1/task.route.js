const express = require('express');
const { taskController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger');

const router = express.Router();

router.post('/new', auth());

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task Management
 */

/**
 * @swagger
 * /tasks/new:
 *   post:
 *     summary: Add a new Task
 *     description: Add a new to task to a sprint
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 */
