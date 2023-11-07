const express = require('express');
const auth = require('../../middlewares/auth');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');
const reqLog = require('../../middlewares/reqLogger');
const { sprintController } = require('../../controllers');
const { sprintValidation, projectValidation } = require('../../validations');

const router = express.Router({ mergeParams: true });

const MANAGER = 'Manager';
const ADMIN = 'Admin';

router
    .route('/')
    .post(
        auth(),
        validate(sprintValidation.createSprint),
        projectAccess,
        checkRole(MANAGER),
        sprintController.createSprint
    )
    .get(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        sprintController.getSprints
    );

router
    .route('/:sprintId')
    .get(
        auth(),
        validate(sprintValidation.sprintId),
        projectAccess,
        sprintController.getSprint
    )
    .patch(
        auth(),
        validate(sprintValidation.sprintId),
        projectAccess,
        checkRole(MANAGER),
    )
    .put(
        auth(),
        validate(sprintValidation.updateSprint),
        projectAccess,
        checkRole(MANAGER),
        
    )
    .delete(
        auth(),
        validate(sprintValidation.statusValidation),
        projectAccess,
        checkRole(ADMIN),
        
    );

router.route('/:sprint/tasks').get(auth()).post(auth());

router.route('/:sprint/tasks/:taskId').patch(auth()).delete(auth());

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Sprints
 *     description: Task Management
 */

/**
 * @swagger
 * /projects/{projectId}/sprints:
 *   post:
 *     summary: Create a new Sprint
 *     tags: [Sprints]
 *     description: Enter Project ID, Sprint Title, start and End date to create a new sprint
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startDate
 *               - EndDate
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: "Sprint 1"
 *               startDate: "2023-10-18"
 *               endDate: "2023-10-30"
 *               description: "First sprint of the project"
 *     responses:
 *       "201":
 *         description: New Sprint added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Sprint:
 *                   $ref: '#/components/schemas/Sprint'
 *       "400":
 *         description: Bad Request
 *
 *
 *   get:
 *     summary: Get all sprints of a project
 *     tags: [Sprints]
 *     description: Enter Project ID to retrieve sprints
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /projects/{projectId}/sprints/{sprintId}:
 *   get:
 *     summary: Get sprint by Id
 *     tags: [Sprints]
 *     description: Enter Project ID to retrieve sprints
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: sprintId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint id       
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       '400':
 *         description: Bad Request  
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update Sprint Status
 *     tags: [Sprints]
 *     description: Enter Project ID, Sprint ID and Status to update sprint status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: sprintId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint id    
 *  
 *   put:
 *     summary: Update Sprint
 *     tags: [Sprints]
 *     description: Enter Project ID, Sprint ID and Sprint Body to update the sprint
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: sprintId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint id    
 *
 *   delete:
 *     summary: Delete Sprint (Only Admin and Managers can delete a sprint)
 *     tags: [Sprints]
 *     description: Enter Project ID, Sprint ID to delete a sprint
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: sprintId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint id
 *

 */
