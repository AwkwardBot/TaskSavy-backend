const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCustomTicket = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        ticket_type: Joi.object().keys({
            name: Joi.string().required(),
            theme: Joi.object().keys({
                "bg": Joi.string().trim().required(),
                "text": Joi.string().trim().required()
            })
    })
    })
};

const ticketTypeId = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
        ticketTypeId: Joi.required().custom(objectId),
    })
}

module.exports = {
    createCustomTicket,
    ticketTypeId
}
