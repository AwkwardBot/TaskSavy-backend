const express = require('express');
const router = express.Router();
const {requirementsController} = require('../../controllers');


/**
 * @swagger
 * tags:
 *   name: Requirements
 *   description: API endpoints for managing requirements
 */

/**
 * @swagger
 * /projects/{projectId}/requirements:
 *   post:
 *     summary: Create a new requirement
 *     tags: [Requirements]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Requirement'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requirement'
 *       '500':
 *         description: Server error
 */
router.post('/projects/:projectId/requirements', requirementsController.createRequirement);

/**
 * @swagger
 * /projects/{projectId}/requirements:
 *   get:
 *     summary: Get requirements by projectId
 *     tags: [Requirements]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requirement'
 *       '500':
 *         description: Server error
 */
router.get('/projects/:projectId/requirements', requirementsController.getRequirementsByProjectId);

/**
 * @swagger
 * /projects/{projectId}/requirements/{requirementId}:
 *   put:
 *     summary: Update a requirement
 *     tags: [Requirements]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *       - in: path
 *         name: requirementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the requirement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Requirement'
 *     responses:
 *       '200':
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requirement'
 *       '500':
 *         description: Server error
 */
router.put('/projects/:projectId/requirements/:requirementId', requirementsController.updateRequirement);

/**
 * @swagger
 * /projects/{projectId}/requirements/{requirementId}:
 *   delete:
 *     summary: Delete a requirement
 *     tags: [Requirements]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *       - in: path
 *         name: requirementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the requirement to delete
 *     responses:
 *       '204':
 *         description: No content
 *       '500':
 *         description: Server error
 */
router.delete('/projects/:projectId/requirements/:requirementId', requirementsController.deleteRequirement);


module.exports = router;
