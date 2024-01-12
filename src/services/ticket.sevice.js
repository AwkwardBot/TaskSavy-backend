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
    
    const ticket = await getTicketById(ticketId)
    await Ticket.deleteOne(ticket)

};

const updateTicket = async (ticketId, ticketBody) => {


    try {
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return {
                success: false,
                message: 'Ticket not found',
            };
        }

        console.log(ticketBody.sprint)

        if (!ticketBody.sprint) {
            delete ticket.sprint;
            delete ticketBody.sprint;
        }

        console.log("-->", ticket)

        Object.assign(ticket, ticketBody);
        
        const updatedTicket = await ticket.save();

        console.log("Updated", updatedTicket);
        return {
            success: true,
            data: updatedTicket
        };
    } catch (e) {
        console.error(e); 
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

const getTicketsBySprint = async (sprintId) => {

    const tickets = await Ticket.find({sprint:sprintId })
    return tickets
}


const removeSprint = async (sprintId) => {
    await Ticket.updateMany(
      { sprint: sprintId },
      { $unset: { sprint: 1 } } 
    );
  };


module.exports = {
    createTicket,
    getTickets,
    deleteTicketbyId,
    updateTicket,
    getTicketById,
    getTicketsBySprint,
    removeSprint
};
