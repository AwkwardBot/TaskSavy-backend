const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createTicket = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        ticket_type_id: Joi.required().custom(objectId),
        title: Joi.string().required(),
        description: Joi.string().required(),
        assignee: Joi.custom(objectId),
        due_date: Joi.date().required(),
        sprint: Joi.custom(objectId)
        
    })
    .unknown(true)
};


module.exports = {
    createTicket,
    

}