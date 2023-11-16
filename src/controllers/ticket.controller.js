const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ticketService } = require('../services');

const createTicket = catchAsync(async (req, res) => {
    
    const ticket = await ticketService.createTicket(req.params.projectId, req.body)

    res.status(httpStatus.CREATED).send(ticket)


});

const getTickets = catchAsync(async (req, res) => {
    
    const tickets = await ticketService.getTickets(req.params.projectId)
    res.status(httpStatus.OK).send(tickets)
});

const getTicketsBySprint = catchAsync(async (req, res) => {
    const tickets = await ticketService.getTicketsBySprint(req.params.projectId, req.params.sprintId)
    res.status(httpStatus.OK).send(tickets)


});

const getTicketById = catchAsync(async (req, res) => {});

const updateTicket = catchAsync(async (req, res) => {
    
    const ticket = await ticketService.updateTicket(req.params.ticketId, req.body)

    res.status(httpStatus.OK).send(ticket)
    


});

const changeTicketStatus = catchAsync(async (req, res) => {
    
});

const getTicketAssignees = catchAsync(async (req, res) => {});

const assignTicket = catchAsync(async (req, res) => {});

const removeTicketAssignee = catchAsync(async (req, res) => {});

module.exports = {
    createTicket,
    getTickets,
    getTicketsBySprint,
    getTicketById,
    updateTicket,
    assignTicket,
    changeTicketStatus,
    getTicketAssignees,
    removeTicketAssignee
};
