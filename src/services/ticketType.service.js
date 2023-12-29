const httpStatus = require('http-status');
const { TicketType } = require('../models');
const ApiError = require('../utils/ApiError');


const createTicketType = async (projectId, ticketTypeBody) => {

    
    const ticketType = await TicketType.create(
        {
            projectId: projectId, 
            ticket_type: ticketTypeBody
        }
    )
    return ticketType
}


const addCustomTicketType = async (projectId, ticketBody) => {

    const tickets = await TicketType.findOne({projectId: projectId})
    if(!tickets) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Ticket Types Does not exist");    
    }
    tickets.ticket_type = [...tickets.ticket_type , ticketBody] 
    await tickets.save()
    
    return tickets

};

const deleteTicketType = async (projectId, ticketTypeId) => {

    var tickets = await TicketType.findOneAndUpdate({projectId: projectId}, {
        $pull: { ticket_type: { _id: ticketTypeId } },
      },
      {new: true})
    // tickets.ticket_type = tickets.ticket_type.filter((t) => { t._id == ticketId});
    return tickets.ticket_type

};

const getTickets = async (projectId) => {

    const tickets = await TicketType.find({projectId: projectId})
    return tickets
};

// const findTicketTypeExistById = async (projectId, ticketId) => {

//     const tickets = await TicketType.findOne({projectId: projectId})
//     const { ticket_type } = tickets
//     for(var i in ticket_type){
        
//         if (ticket_type[i]._id == ticketId)
//         return ticket_type[i]
//     }
//     throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Ticket Type Id")
// };

const getTicketTypeById = async (projectId, ticketId) => {

    const tickets = await TicketType.findOne({projectId: projectId})
    const { ticket_type } = tickets
    for(var i in ticket_type){
        if (ticket_type[i]._id == ticketId)
            return ticket_type[i]
    }
    
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Ticket Type Id")
};


module.exports = {
    createTicketType,
    addCustomTicketType,
    deleteTicketType,
    getTickets,
    // findTicketTypeExistById,
    getTicketTypeById
};
