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

    
    const ticketRes = await Ticket.create(ticketBody);
    
    if (!ticketRes) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error Generating Ticket');
    }

    return ticketRes;
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
        var ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return {
                success: false,
                message: 'Ticket not found',
            };
        }

        if (!ticketBody.sprint && ticketBody.description) {
            console.log("Deleting Ticket");
            ticket.sprint = undefined;
            ticketBody.sprint = undefined;
            console.log("After Delete: ", ticket)
        }

        console.log("Ticket Update Body:", ticketBody);
        Object.assign(ticket, ticketBody);
        console.log("Updated Ticket:", ticket);
        const updatedTicket = await ticket.save();

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


const setDefaultStatus = async (projectId, statusToRemove) => {

    await Ticket.updateMany(
        {   projectId: projectId,
            status: statusToRemove,  },
        { $set: { status: "Pending" } } 
      );

}


module.exports = {
    createTicket,
    getTickets,
    deleteTicketbyId,
    updateTicket,
    getTicketById,
    getTicketsBySprint,
    removeSprint,
    setDefaultStatus
};
