const express = require('express');
const httpStatus = require('http-status');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reqLog = require('../../middlewares/reqLogger');
const { projectController } = require('../../controllers');
const { projectValidation } = require('../../validations');
const { projectAccess, checkRole } = require('./../../middlewares/Access');

const router = express.Router();

const MANAGER = 'Manager';
const ADMIN = 'Admin';

router
    .route('/')
    .post(
        auth(),
        validate(projectValidation.createProject),
        projectController.createProject
    )
    .get(auth(), projectController.getProjects);

router
    .route('/:projectId')
    .get(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        projectController.getProject
    )
    .delete(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        checkRole('Admin'),
        projectController.deleteProject
    )   
    .put(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        checkRole('Admin'),
        projectController.updateProject
    )

// Tags
router
    .route('/:projectId/tags')
    .get(
        auth(),
        validate(projectValidation.projectId),
        projectController.getTags
    )
    .patch(
        auth(),
        validate(projectValidation.createDeleteTag),
        projectController.addTag
    )
    .delete(
        auth(),
        validate(projectValidation.createDeleteTag),
        projectController.deleteTag
    )
    .put(
        auth(),
        validate(projectValidation.updateTag),
        projectController.updateTag
    );

// Active Status
router
    .route('/:projectId/active-status')
    .patch(
        auth(),
        validate(projectValidation.changeStatus),
        projectAccess,
        checkRole(MANAGER),
        projectController.changeActiveStatus
    );

router
    .route('/:projectId/status')
    .patch(
        auth(),
        validate(projectValidation.changeStatus),
        projectAccess,
        checkRole(ADMIN),
        projectController.changeStatus
    );

// Boards
router
    .route('/:projectId/boards')
    .get(
        auth(),
        validate(projectValidation.projectId),
        projectAccess,
        checkRole(MANAGER),
        projectController.getBoards
    )
    .post(
        auth(),
        projectAccess,
        validate(projectValidation.projectId),
        projectController.addBoard
    )
   
    

router
    .route('/:projectId/boards/:board')
    .get(
        auth(),
        validate(projectValidation.projectId),
        projectController.getBoard
    )
    .delete(
        auth(),
        validate(projectValidation.projectId),
        projectController.removeBoard
    )
    .patch(
        auth(),
        validate(projectValidation.projectId),
        projectController.updateBoard
    );

// Members
router
    .route('/:projectId/members')
    .get(
        auth(),
        validate(projectValidation.projectId),
		projectAccess,
        projectController.getMembers
    )
    .patch(
        auth(),
        validate(projectValidation.projectId),
		projectAccess,
		checkRole(MANAGER),
        projectController.addMembers
    );

router 
    .route('/:projectId/members/details')
    .get(auth(), validate(projectValidation.projectId), projectAccess, projectController.getMembersDetail)


router
    .route('/:projectId/members/:memberId')
    .get(
        auth(),
        validate(projectValidation.memberId),
        projectController.getMemberById
    )
    .delete(
        auth(),
        validate(projectValidation.memberId),
        projectController.deleteMember
    )
    .patch(
        auth(),
        validate(projectValidation.changeMemberRole),
        projectController.changeMemberRole
    );

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Project Management and Retrieval
 *   - name: Tags
 *     description: Projects's Tag Management and Retrieval
 *   - name: Project Members
 *     description: Project's Members Management and Retrieval
 *
 */

/**
 * @swagger
 * /projects:
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
 *
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
 *     summary: Delete user's project
 *     tags: [Projects]
 *     description: Only project's admin can delete the project
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
 *       '204':
 *         description: Deleted Success
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   delete:
 *     summary: Delete user's project
 *     tags: [Projects]
 *     description: Only project's admin can delete the project
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
 *       '204':
 *         description: Deleted Success
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
 *   patch:
 *     summary: Create a new Tag of a project
 *     tags: [Tags]
 *     description: Admin and Manager can create a new tag
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
 *               $ref: '#/components/schemas/'
 *
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
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
 *   put:
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
 *   delete:
 *     summary: Delete Tag
 *     tags: [Tags]
 *     description: Manager and Admin can delete the tags
 *     security:
 *       - bearerAuth: []
 *     
 *     
 */

/**
 * @swagger
 * /projects/{projectId}/active-status:
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
 *                 enum: ['Active', 'Archive', 'Deleted']
 *
 *     responses:
 *       '204':
 *         description: OK
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /projects/{projectId}/status:
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

// Project Members
/**
 * @swagger
 * /projects/{projectId}/members:
 *   get:
 *     summary: Get project members
 *     tags: [Project Members]
 *     descriptions: Only authorized users can fetch the members
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
 *               $ref: '#/components/schemas/Members'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   	
 *   
 *   patch:
 *     summary: Add Member
 *     tags: [Project Members]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             '$ref': '#/components/schemas/Member'
 */

/**
 * @swagger
 * /projects/{projectId}/members/details:
 *   get:
 *     summary: Get detail project members
 *     tags: [Project Members]
 *     descriptions: Only authorized users can fetch the members
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
 *               $ref: '#/components/schemas/MemberDetail'
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
 * /projects/{projectId}/members/{memberId}:
 *   get:
 *     summary: Get project members
 *     tags: [Project Members]
 *     descriptions: Only authorized users can fetch the members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: memberId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Member id   
 *             
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemberDetail'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   	
 *   
 *   delete:
 *     summary: Get project members
 *     tags: [Project Members]
 *     descriptions: Only authorized users can fetch the members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: memberId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Member id  
 *     responses:
 *       '204':
 *         description: Deleted Successfully
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Get project members
 *     tags: [Project Members]
 *     descriptions: Only authorized users can fetch the members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: memberId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Member id
 *     responses:
 *       '200':
 *         description: Deleted Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemberDetail'
 *           
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound' 
 * 
 * 
 */

