const express = require('express');
const {} = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger');

const router = express.Router();

/* eslint-disable */
router
    .route('/')
    .get(auth())
    .post(auth());

/* eslint-disable */
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name:
 *             properties:
 *               name:
 *                 type: string
 *                  
 *
 *   get:
 *     summary: Get Workspaces
 *     description: Fetch all workspaces of the authenticated user
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *     
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
