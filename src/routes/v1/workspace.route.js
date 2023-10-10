const express = require('express');
const {  } = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger')

const router = express.Router();

router
    .route('/')
    .get('/', auth(), )
    .post('/', auth(),  )

router
    .route('/:id')
    .put('/:id', auth(), )
    .get('/:id', auth(), ) 
    .delete('/:id', auth(), )


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


