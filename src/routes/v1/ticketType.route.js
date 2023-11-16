const express = require('express');
const { ticketTypeController } = require('../../controllers')
const auth = require('../../middlewares/auth');
const reqLog = require('../../middlewares/reqLogger');
const { projectAccess, checkRole } = require('../../middlewares/Access');
const validate = require('../../middlewares/validate');
const { projectValidation, ticketTypeValidation } = require('../../validations');

const router = express.Router({ mergeParams: true });

const MANAGER = 'Manager';
const ADMIN = 'Admin';

router
    .route('/')
    .post(auth(), validate(ticketTypeValidation.createCustomTicket), projectAccess, checkRole(MANAGER), ticketTypeController.addCustomTicketType)
    .get(auth(), validate(projectValidation.projectId), projectAccess, reqLog, ticketTypeController.getAllTicketTypes);

router
    .route('/:ticketTypeId')
    .delete(auth(), validate(ticketTypeValidation.ticketTypeId), projectAccess, checkRole(MANAGER), ticketTypeController.deleteTicketType)
    .get(auth(), validate(ticketTypeValidation.ticketTypeId), projectAccess, ticketTypeController.getTicketTypeById)


module.exports = router

/**
 * @swagger
 * tags:
 *   - name: TicketType
 *     description: Tickets Types Management
 */

/**
 * @swagger
 * /projects/{projectId}/ticket-types:
 *   post:
 *     summary: Create a new custom TicketType
 *     description: Requires Manager or Admin access
 *     tags: [TicketType]
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
 *             $ref: '#/components/schemas/TicketType'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketTypeArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   get:
 *     summary: Get all ticket types of a project
 *     description: Enter project Id to fetch the tickets of a project
 *     tags: [TicketType]
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
 *               $ref: '#/components/schemas/TicketTypeArray'
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
 * /projects/{projectId}/ticket-types/{ticketTypeId}:
 *   delete:
 *     summary: Get all ticket types of a project
 *     description: Enter project Id to fetch the tickets of a project
 *     tags: [TicketType]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: ticketTypeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: TicketType id
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketTypeArray'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   get:
 *     summary: Get ticket type details
 *     description: Enter project Id and ticket type Id to fetch the tickets type
 *     tags: [TicketType]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *       - name: ticketTypeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: TicketType id
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 */