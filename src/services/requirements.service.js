const httpStatus = require('http-status');
const {Requirements} = require('../models');
const ApiError = require('../utils/ApiError');


const createRequirement = async (reqBody) => {

    const newRequirement = await Requirements.create(reqBody);
    return newRequirement;

};


const getRequirementsByProjectId = async (projectId) => {

    const requirements = await Requirements.find({ projectId });
    return requirements;

};

const getModuleByID = async (projectId, moduleId) => {
    const reqModule = await Requirements.findOne({ projectId: projectId, _id: moduleId });

    if(!reqModule)
        throw new ApiError(httpStatus.NOT_FOUND, "Module does not exist")

    return reqModule;
};

const getRequirementById = async (projectId, moduleId, reqId) => {

    console.log(projectId, moduleId, reqId)

        const req = await Requirements.findOne(
            {
                '_id': moduleId,
                'projectId': projectId,
                'requirements._id': reqId
            },
            {
                'requirements.$': 1
            }

        )

        

        if(!req)
            throw new ApiError(httpStatus.NOT_FOUND, "Requirement does not exist")
        
        return req;

};


const updateRequirement = async (projectId, moduleId, reqId, updateBody) => {
    await Requirements.findOneAndUpdate(
        {
            'projectId': projectId,
            'requirements._id': reqId,
            '_id': moduleId
        },
        {
            $set: {
                'requirements.$.requirement': updateBody.requirement,
                'requirements.$.class': updateBody.class,
                'requirements.$.type': updateBody.type
            },
        
            
        },
        
    );

    const req = await getRequirementById(projectId, moduleId, reqId)


    console.log("---------->>>>",req)

    if (!req)
        throw new ApiError(httpStatus.NOT_FOUND, "Requirement not found")

    return req;

};


const deleteRequirement = async (projectId, moduleId, reqId) => {
    const req = await Requirements.findOneAndUpdate(
        {
            '_id': moduleId,
            'projectId': projectId,
            'requirements._id': reqId
            
        },
        {
            $pull: {
                requirements: { _id: reqId }
            }
        },
        { 
            new: true, 
           
        }
    );


    if (!req)
        throw new ApiError(httpStatus.NOT_FOUND, "Requirement not found");

    return req;
};


const addRequirmentToModule = async (requirementBody, moduleId, projectId) => {

    const reqModule = await Requirements.findOne({'_id': moduleId, 'projectId': projectId})
    reqModule.requirements.push(requirementBody)
    reqModule.save()
    return reqModule
    
}


module.exports = {
    createRequirement,
    getRequirementsByProjectId,
    updateRequirement,
    deleteRequirement,
    addRequirmentToModule,
    getRequirementById
};
