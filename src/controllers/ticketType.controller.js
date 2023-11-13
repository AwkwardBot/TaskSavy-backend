const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ticketTypeService } = require('../services');

const addCustomTicketType = catchAsync(async (req, res) => {

    console.log(req.body)
    console.log(req.body.ticket_type.theme.bg)

    await ticketTypeService.addCustomTicketType(req.params.projectId, req.body.ticket_type)
    getAllTicketTypes(req, res)

});

const getAllTicketTypes = catchAsync(async (req, res) => {

    const ticketTypes = await ticketTypeService.getTickets(req.params.projectId)

    res.status(httpStatus.OK).send(ticketTypes)
});

const deleteTicketType = catchAsync(async (req, res) => {

    await ticketTypeService.deleteTicketType(req.params.projectId, req.params.ticketId)

    return getAllTicketTypes(req, res)
});


module.exports = {
    addCustomTicketType,
    getAllTicketTypes,
    deleteTicketType,

};
