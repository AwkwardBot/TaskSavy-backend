const httpStatus = require('http-status');
const { Ticket } = require('../models');
const ApiError = require('../utils/ApiError');
const ticketTypeService = require('./ticketType.service')

const createTicket = async (projectId, ticketBody) => {
    ticketBody.projectId = projectId;
    const ticketId = ticketBody.ticket_type_id;

    const availableTickets = ticketTypeService.findTicketTypeExistById(
        projectId,
        ticketId
    );

    if (!availableTickets) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ticket Id');
    }

    const ticketres = await Ticket.create(ticketBody);

    if (!ticketres) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error Generating Ticket');
    }

    return ticketres;
};

const getTickets = async (projectId) => {

    const tickets = await Ticket.find({ projectId: projectId });
    return tickets;

};

const deleteTicketbyId = async (projectId, ticketId) => {
    try {
        await Ticket.deleteOne(ticketId)
        return {
            success: true
        }
    }
    catch(e) {
        consle.log(e)
        return {
            success: false,
            message: e.message
        }
    }
}

const updateTicket = async (ticketId, ticketBody) => {
    
    try {
        await Ticket.findByIdAndUpdate(ticketId, ticketBody)
        return {
            success: true
        }
    }
    catch(e) {
        consle.log(e)
        return {
            success: false,
            message: e.message
        }
    }
    


}

module.exports = {
    createTicket,
    getTickets,
    deleteTicketbyId,
    updateTicket
};
