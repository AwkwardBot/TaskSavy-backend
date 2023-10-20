const express = require('express');
const {} = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger');

const router = express.Router();

/* eslint-enable */
router
    .route('/')
    .get(auth())
    .post(auth());


/* eslint-enable */
router
    .route('/:id')
    .put(auth())
    .get(auth())
    .delete(auth());

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Workspace
 *     description: Task Management
 */

/**
 * @swagger
 * /workspaces/:
 *   post:
 *     summary: Create a new Workspace
 *     description: Add a new to task to a sprint
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *
 *   get:
 *
 */

/**
 * @swagger
 * /workspaces/{id}:
 *   put:
 *     summary: Create a new Workspace
 *     description: Add a new to task to a sprint
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *
 *   get:
 *
 *   delete:
 *
 *
 */
