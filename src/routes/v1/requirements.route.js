const express = require('express');
const {requirementsController} = require('../../controllers');
const { sprintValidation, projectValidation } = require('../../validations');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

const MANAGER = 'Manager';
const ADMIN = 'Admin';

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
 *     summary: Create a new requirement module
 *     tags: [Requirements]
 *     description: Only authorized users can create requirements module
 *     security:
 *       - bearerAuth: [] 
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
 *             $ref: '#/components/schemas/Requirements'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requirement'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.post('/', auth(), validate(projectValidation.projectId), projectAccess,  requirementsController.createRequirement);

/**
 * @swagger
 * /projects/{projectId}/requirements:
 *   get:
 *     summary: Get requirements by projectId
 *     tags: [Requirements]
 *     description: Only authorized users can fetch requirements
 *     security:
 *       - bearerAuth: [] 
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
router.get('/', auth(), validate(projectValidation.projectId), projectAccess,requirementsController.getRequirementsByProjectId);

/**
 * @swagger
 * /projects/{projectId}/requirements/{moduleId}/{reqId}:
 *   put:
 *     summary: Update a requirement
 *     tags: [Requirements]
 *     description: Only authorized users can edit the requirement
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Module
 *       - in: path
 *         name: reqId
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
 *               $ref: '#/components/schemas/Requirements'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/:moduleId/:reqId', auth(), validate(projectValidation.projectId), projectAccess, requirementsController.updateRequirement);

/**
 * @swagger
 * /projects/{projectId}/requirements/{moduleId}/{reqId}:
 *   delete:
 *     summary: Delete a requirement
 *     tags: [Requirements]
 *     descriptions: Only Managers and Admins can delete the requirement
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Module
 *       - in: path
 *         name: reqId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the requirement
 *     responses:
 *       '204':
 *         description: 'Requirement Deleted'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:moduleId/:reqId', auth(), validate(projectValidation.projectId), projectAccess, checkRole(MANAGER),  requirementsController.deleteRequirement);

/**
 * @swagger
 * /projects/{projectId}/requirements/{moduleId}/{reqId}:
 *   get:
 *     summary: Get a requirement
 *     tags: [Requirements]
 *     descriptions: Only authorized users can fetch the Requirement
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Module
 *       - in: path
 *         name: reqId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the requirement
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requirement'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

router.get('/:moduleId/:reqId',auth(), validate(projectValidation.projectId), projectAccess,  requirementsController.getRequirement);





router
    .route('/:moduleId')
    .patch(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        requirementsController.addRequirmentToModule)


module.exports = router;
