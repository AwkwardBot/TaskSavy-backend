const express = require('express');
const projectController = require('../../controllers/project.controller');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger')


const router = express.Router();
router.post('/new', auth(),  projectController.createProject)
router.get('/', auth(), projectController.getProjects)
router.get('/:projectId', auth(),  projectController.getProject);
router.get('/:projectId/tags', auth(), projectController.getTags)
router.patch('/:projectId/tags/new', auth(), projectController.addTag)
router.delete('/:projectId/tags/delete', auth(), projectController.removeTag)
router.patch('/:projectId/tags/update', auth(),projectController.updateTag)

router.patch('/:projectId/active-status/update', auth(), projectController.changeActiveStatus);
router.patch('/:projectId/status/update', auth(), projectController.changeStatus);

module.exports = router;



/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Project Management and Retrieval 
 *   - name: Tags 
 *     description: Projects's Tag Management and Retrieval
 * 
 */    

/**
 * @swagger
 * /projects/new:
 *   post:
 *     summary: Create a new Project
 *     description: Logged in user can create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - key
 *               - startDate
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               key:
 *                 type: string
 *                 minlength: 3
 *                 maxlength: 4
 *                 description: At least one number and one letter
 *             example:
 *               name: "Sample Project"
 *               description: "This is sample Projext"
 *               key: SMP
 *     responses:
 *       "201":
 *         description: New Project Added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get user's projects
 *     tags: [Projects]
 *     descriptions: Only authenticated users can retrieve their projects
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *               
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       
 */

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get a projects
 *     tags: [Projects]
 *     descriptions: Only authenticated users can fetch their project
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
 *               $ref: '#/components/schemas/Project'
 *               
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       
 */

/**
 * @swagger
 * /projects/{projectId}/tags:
 *   get:
 *     summary: Get Tags of a project
 *     tags: [Tags]
 *     description: Only project members can fetch the tags
 *     security:
 *       - bearerAuth: [] 
 *     parameters:     
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *         
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *               
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       
 */ 

/**
 * @swagger
 * /projects/{projectId}/tags/update:
 *   patch:
 *     summary: Update Tag
 *     tags: [Tags]
 *     description: Only project members can fetch the tags
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
 *             properties:
 *               oldName:
 *                 type: string
 *               newName:
 *                 type: string
 *             example:
 *               old: Task
 *               new: Task1
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *               
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 */


/**
 * @swagger
 * /projects/{projectId}/active-status/update:
 *   patch:
 *     summary: Change Project's Active Status
 *     tags: [Projects]
 *     descriptions: Only admin can change the active status
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['Pending', 'Working', 'Completed']
 *             
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *               
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       
 */


/**
 * @swagger
 * /projects/{projectId}/status/update:
 *   patch:
 *     summary: Change Project's Working Status
 *     tags: [Projects]
 *     descriptions: Only admins and managers can change the active status
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['Pending', 'Working', 'Completed']
 *             
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *               
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       
 */