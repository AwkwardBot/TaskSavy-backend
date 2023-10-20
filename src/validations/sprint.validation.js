const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createSprint = {
    params: Joi.object().keys({
        projectId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
      title: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      description: Joi.string()
    }),
  };


const sprintId = {
    params: Joi.object().keys({
      projectId: Joi.required().custom(objectId),
      sprintId: Joi.required().custom(objectId),
    }),
  };

const statusValidation = {
    params: Joi.object().keys({
      projectId: Joi.required().custom(objectId),
      sprintId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
      status: Joi.string().required()
    }),
  };

module.exports = {

    createSprint,
    sprintId,
    statusValidation


}