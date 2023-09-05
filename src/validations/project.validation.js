const Joi = require('joi');

const createProject = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        key: Joi.string().min(3).max(4).required()

    })
}

const getProjects = {

}

const getProject = {

}

const updateProject = {

}

const changeActiveStatus = {


}

const changeStatus = {


}

const getTags = {


}

const addTag = {


}

const removeTag = {


}

const getBoards = {


}


const addBoard = {


}

const removeBoard = {


}


const updateTag = {

    
}


module.exports = {

}