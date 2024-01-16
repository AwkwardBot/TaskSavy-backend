const httpStatus = require('http-status');
const { Requirements } = require('../models');
const ApiError = require('../utils/ApiError');
const { default: axios } = require('axios');

const createRequirement = async (reqBody) => {
    const newRequirement = await Requirements.create(reqBody);
    return newRequirement;
};

const getRequirementsByProjectId = async (projectId) => {
    const requirements = await Requirements.find({ projectId });
    return requirements;
};

const getModuleByID = async (projectId, moduleId) => {
    const reqModule = await Requirements.findOne({
        projectId: projectId,
        _id: moduleId
    });

    if (!reqModule)
        throw new ApiError(httpStatus.NOT_FOUND, 'Module does not exist');

    return reqModule;
};

const getRequirementById = async (projectId, moduleId, reqId) => {
    const req = await Requirements.findOne(
        {
            _id: moduleId,
            projectId: projectId,
            'requirements._id': reqId
        },
        {
            'requirements.$': 1
        }
    );

    if (!req)
        throw new ApiError(httpStatus.NOT_FOUND, 'Requirement does not exist');

    return req;
};

const updateRequirement = async (projectId, moduleId, reqId, updateBody) => {
    await Requirements.findOneAndUpdate(
        {
            projectId: projectId,
            'requirements._id': reqId,
            _id: moduleId
        },
        {
            $set: {
                'requirements.$.requirement': updateBody.requirement,
                'requirements.$.class': updateBody.class,
                'requirements.$.type': updateBody.type
            }
        }
    );

    const req = await getRequirementById(projectId, moduleId, reqId);

    if (!req) throw new ApiError(httpStatus.NOT_FOUND, 'Requirement not found');

    return req;
};

const deleteRequirement = async (projectId, moduleId, reqId) => {
    const req = await Requirements.findOneAndUpdate(
        {
            _id: moduleId,
            projectId: projectId,
            'requirements._id': reqId
        },
        {
            $pull: {
                requirements: { _id: reqId }
            }
        },
        {
            new: true
        }
    );

    


    if (!req) throw new ApiError(httpStatus.NOT_FOUND, 'Requirement not found');

    

    return req;
};

const addRequirementToModule = async (projectId, moduleId, requirementBody) => {
    const reqModule = await Requirements.findOne({
        _id: moduleId,
        projectId: projectId
    });



    if (!reqModule) throw new ApiError(httpStatus.NOT_FOUND, 'Module not Found');

    requirementBody.ambiguity = await checkReq(requirementBody.requirement)
    requirementBody.class = await classifyReq(requirementBody.requirement)

    reqModule.requirements.push(requirementBody);
    reqModule.save();
    return reqModule;
};

const updateModuleById = async (projectId, moduleId, updateBody) => {
    const reqModule = await Requirements.findOne({
        _id: moduleId,
        projectId: projectId
    });
    if (!reqModule) throw new ApiError(httpStatus.NOT_FOUND, 'Module not Found');
    Object.assign(reqModule, updateBody);
    reqModule.save();
    return reqModule;
    };

const deleteModuleById = async (projectId, moduleId) => {
    const reqModule = await Requirements.findOne({
        _id: moduleId,
        projectId: projectId
    });
    if (!reqModule) throw new ApiError(httpStatus.NOT_FOUND, 'Module not Found');

    await reqModule.remove();
    return reqModule;
};

const getModuleById = async (projectId, moduleId) => {
    const reqModule = await Requirements.findOne({
        _id: moduleId,
        projectId: projectId
    });
    if (!reqModule) throw new ApiError(httpStatus.NOT_FOUND, 'Module not Found');

    return reqModule;
};


const checkReq = async (requirement) => {
    var body = {"text": requirement}
    const resp = await axios.post("http://summary.tasksavy.site/analyze_fr", body)
    return resp.data.most_common_ambiguity

}

const classifyReq = async (requirement) => {
    var body = {"text": requirement}
    const resp = await axios.post("http://127.0.0.1:5000/predict", body)
    return resp.data.label

}

module.exports = {
    createRequirement,
    getRequirementsByProjectId,
    updateRequirement,
    deleteRequirement,
    addRequirementToModule,
    getRequirementById,
    updateModuleById,
    deleteModuleById,
    getModuleById,
    checkReq,
    classifyReq
};
