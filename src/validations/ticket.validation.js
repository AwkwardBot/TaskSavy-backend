const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createTicket = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        
    })
};


module.exports = {
    createTicket,
    

}