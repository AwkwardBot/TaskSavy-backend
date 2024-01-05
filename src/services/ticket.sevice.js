const httpStatus = require('http-status');
const { Ticket } = require('../models');
const ApiError = require('../utils/ApiError');
const ticketTypeService = require('./ticketType.service')

const createTicket = async (projectId, ticketBody) => {
    ticketBody.projectId = projectId;
    const ticketId = ticketBody.ticket_type_id;

    const checkTicketType = ticketTypeService.getTicketTypeById(
        projectId,
        ticketId
    );

    if (!checkTicketType) {
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
    console.log("Body: ", ticketBody);
    try {
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return {
                success: false,
                message: 'Ticket not found',
            };
        }

        Object.assign(ticket, ticketBody);

        const updatedTicket = await ticket.save();

        console.log("Updated", updatedTicket);
        return {
            success: true,
            data: updatedTicket
        };
    } catch (e) {
        console.log("Error Here")
        console.error(e); // Corrected 'consle' to 'console'
        return {
            
            success: false,
            message: e.message,
        };
    }
};

const getTicketById = async (ticketId) => {
    const ticket = await Ticket.findById(ticketId)
    if (!ticket)
        throw new ApiError (httpStatus.NOT_FOUND, "Ticket not found")
    return ticket
}



module.exports = {
    createTicket,
    getTickets,
    deleteTicketbyId,
    updateTicket,
    getTicketById
};
