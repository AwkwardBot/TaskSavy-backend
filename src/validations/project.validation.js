const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    key: Joi.string().min(3).max(4).required(),
  }),
};

const projectId = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    old: Joi.string().required(),
    new: Joi.string().required(),
  }),
};

const changeStatus = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().required(),
  }),
};

const createDeleteTag = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    tag: Joi.string().required(),
  }),
};

const getBoards = {};

const addBoard = {};

const removeBoard = {};

const updateTag = {};

const memberId = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
    memberId: Joi.required().custom(objectId),
  }),
};

const changeMemberRole = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
    memberId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    role: Joi.string().required(),
  }),
};

module.exports = {
  createProject,
  projectId,
  changeStatus,
  createDeleteTag,
  updateProject,
  memberId,
  changeMemberRole,
};
