const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ticketTypeService } = require('../services');

const addCustomTicketType = catchAsync(async (req, res) => {



    await ticketTypeService.addCustomTicketType(req.params.projectId, req.body.ticket_type)
    getAllTicketTypes(req, res)

});

const getAllTicketTypes = catchAsync(async (req, res) => {

    const ticketTypes = await ticketTypeService.getTickets(req.params.projectId)

    res.status(httpStatus.OK).send(ticketTypes)
});

const deleteTicketType = catchAsync(async (req, res) => {

    await ticketTypeService.deleteTicketType(req.params.projectId, req.params.ticketTypeId)

    return getAllTicketTypes(req, res)
});

const getTicketTypeById = catchAsync(async(req, res) => {
    const projectId = req.params.projectId;
    const ticketTypeId = req.params.ticketTypeId
    const ticketType = await ticketTypeService.getTicketTypeById(projectId, ticketTypeId)
    if(!ticketType)
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Ticket Type Id")
            
    res.status(httpStatus.OK).send(ticketType)
    
})



module.exports = {
    addCustomTicketType,
    getAllTicketTypes,
    deleteTicketType,
    getTicketTypeById

};
