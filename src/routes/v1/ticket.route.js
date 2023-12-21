const express = require('express');
const { ticketController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');
const { ticketValidation, sprintValidation } = require('../../validations')

const router = express.Router({ mergeParams: true });


router
    .route('/')
    .post(auth(), validate(ticketValidation.createTicket), projectAccess, ticketController.createTicket)
    .get(auth(), projectAccess, ticketController.getTickets);
    
router
    .route('/:ticketId')
    .get(auth(), projectAccess, ticketController.getTicketById)
    .delete()
    .patch(auth(), validate(), projectAccess, ticketController.updateTicket)


router
    .route('/sprint/:sprintId')
    .get(auth(), validate(sprintValidation.sprintId), projectAccess, ticketController.getTicketsBySprint)


module.exports = router

/**
 * @swagger
 * tags:
 *   - name: Ticket
 *     description: Tickets Management
 */

/**
 * @swagger
 * /projects/{projectId}/ticket:
 *   post:
 *     summary: Create a new Ticket
 *     description: Open a new ticket
 *     tags: [Ticket]
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
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketsArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   get:
 *     summary: Get all tickets of a project
 *     description: Enter project Id to fetch its tickets
 *     tags: [Ticket]
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
 *               $ref: '#/components/schemas/TicketsArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /projects/{projectId}/ticket/{ticketId}:
 *   patch:
 *     summary: Create a new Ticket
 *     description: Open a new ticket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: ticketId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket id
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketsArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   get:
 *     summary: Get all tickets of a project
 *     description: Enter project Id to fetch its tickets
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: ticketId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket id
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketsArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /projects/{projectId}/ticket/sprints/{sprintId}:
 *   
 *   get:
 *     summary: Get all tickets of a project
 *     description: Enter project Id to fetch its tickets
 *     tags: [Ticket]
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
 *               $ref: '#/components/schemas/TicketsArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
