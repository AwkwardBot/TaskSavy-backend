const Joi = require('joi');
const { objectId, objectIdArray } = require('./custom.validation');


const createTicket = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
        
    }),
    body: Joi.object().keys({
        ticket_type_id: Joi.required().custom(objectId),
        title: Joi.string().required(),
        description: Joi.string().required(),
        assignee: Joi.custom(objectIdArray),
        due_date: Joi.date(),
        sprint: Joi.custom(objectId)
        
    })
    .unknown(true)
};

const ticketBody = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
        ticketId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        ticket_type_id: Joi.custom(objectId),
        title: Joi.string(),
        description: Joi.string(),
        assignee: Joi.custom(objectIdArray),
        due_date: Joi.date(),
        sprint: Joi.custom(objectId)
        
    })
    .unknown(true)
};

const ticketId = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
        ticketId: Joi.required().custom(objectId),
    })
}


module.exports = {
    createTicket,
    ticketBody,
    ticketId
    

}