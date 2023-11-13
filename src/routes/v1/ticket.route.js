const express = require('express');
const { ticketController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');


const router = express.Router();


router
    .route('/')
    .post(auth(), validate(), projectAccess, ticketController.createTicket)
    .get(auth(), projectAccess, ticketController.getTickets);
    
router
    .route('/:ticketId')
    .get()
    .delete()


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
 *
 */