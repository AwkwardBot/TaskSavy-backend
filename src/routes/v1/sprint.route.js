const express = require('express');
const { sprintController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger')

const router = express.Router();

router
    .route('/')
    .post(auth())
    .get(auth())


router
    .route('/:sprintId')
    .get(auth(), )
    .patch(auth())
    .put()





module.exports = router;


/**
 * @swagger
 * tags:
 *   - name: Sprints
 *     description: Task Management
 */

/**
 * @swagger
 * /sprints:
 *   post:
 *   
 *   get:
 * 
 *     
 */

/**
 * @swagger
 * /{sprintId}:
 *   get:
 *   
 *   
 *   patch:
 * 
 * 
 *   delete:
 *   
 *   put:
 */