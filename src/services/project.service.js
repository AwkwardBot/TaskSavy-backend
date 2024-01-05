const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const ticketTypeService = require('./ticketType.service');


/**
 * Create a new Project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 *
 */
const createProject = async (projectBody, userId) => {
    projectBody.members = [
        {
            userId,
            role: 'Admin'
        }
    ];

    const project = await Project.create(projectBody);
    await ticketTypeService.createTicketType(project.id)
    return project
};

/**
 * Return all projects of the authenticated user
 * @param {Object} userId
 * @returns {Array<Project>}
 */

const getProjects = async (userId) => {
    return Project.find({
        'members.userId': userId
    });
};

const updateProjectById = async (project, body) => {
    
    Object.assign(project, body);
    
    console.log(project, body)
    project.save()
    return project;

};

const deleteProject = async (projectId) => {

	const project = await Project.findByIdAndDelete(projectId);
	if (!project) {
		return false
	}

	return true


};

/**
 * Change the active status of a project.
 * @param {ObjectId} projectId
 * @param {ObjectId} userId
 * @param {ObjectId} status
 * @returns {Promise<Project>}
 */

const changeActiveStatus = async (project, status) => {
    project.activeStatus = status;
    await project.save();
    return project;
};

/**
 * Change the working status of a project.
 * @param {ObjectId} projectId
 * @param {ObjectId} userId
 * @param {ObjectId} status
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const changeStatus = async (project, status) => {
    project.status = status;
    await project.save();
    return project;
};

/**
 * Get all the tags of a project
 * @param {Object} project
 * @returns {Promise<Project>}
 */

const getTags = async (project) => {
    return project.tags;
};

/**
 * Get a single tag
 * @param {Object} project
 * @param {Object} tag
 * @returns {Promise<Tag>}
 */

const getTag = async (project, tag) => {
    const tags = project.tags.find((t) => t.name === tag);

    if (!tags == -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tag does not exist');
    }

    return tags;
};

/**
 * Add a custom tag to the project
 * @param {*} projectId
 * @param {*} userId
 * @returns {Promise<Project>}
 * @throws {ApiError}
 */

const addTag = async (project, tag) => {
    project.tags.push(tag);
    await project.save();
    return project;
};

/**
 * Remove a tag from the project
 * @param {*} project
 * @returns {Promise<Project>}
 */

const deleteTag = async (project, tag) => {
    project.tags = project.tags.filter((tags) => tags !== tag);
    await project.save();
    return project;
};

/**
 *
 * @param {*} projectId
 * @param {*} userId
 * @param {*} tagUpdate
 * @returns {Promise<tag>}
 */

const updateTag = async (project, tagUpdate) => {
    const tag = await getTag(project, tagUpdate.old);
    tag.name = tagUpdate.new;
    project.save();
    return tag;
};


// Boards

/**
 * 
 * @param {project} project 
 * @returns {Promise<boards>}
 */

const getBoards = async (project) => {
    return project.boards
}

const getBoard = async (project, boardId) => {

    const board = project.boards.find((b) => b.id === boardId);
    return board

}

const addBoard = async (project, boardBody) => {
    const count = project.boards.length;
    boardBody.order = count+1;
    project.boards.push(boardBody);

    await project.save();
    return project.boards;
}
 
const updateBoards = async (project, updateBody) => {
    const board = await getBoard(project, updateBody._id)
    board = updateBody
    project.save()
    return project.boards
} 

const deleteBoard = async (project, boardId) => {
    project.boards = project.boards.filter((b) => b._id !== boardId);
    await project.save();
    return project.boards;
}


const getMembers = async (project) => {
    return project.members;
};

const getMembersDetail = async (project) => {
	
	var memberDetails = []


	for (var member of project.members) {

		var detailuser = await userService.getUserById(member.userId)
        
		var user = {
            _id: detailuser._id,
			email: detailuser.email,
			name: detailuser.name,
			role: member.role
		}
		memberDetails.push(user)
	}


	return memberDetails

}

const getMemberDetail = async (project, memberId) => {
		
	var userDetail = userService.getUserById(member.userId)
	if (!userDetail)
		throw new ApiError(httpStatus.NOT_FOUND, "Member with provide id does not exist")
	var user = {
		id: memberId,
		email: userDetail.email,
		name: userDetail.name,
		role: project.members.filter((m)=> m.userId == memberId).role
	}

	return user

}


const getMemberById = async (project, memberId) => {
    return project.members.find((m) => m.id === memberId);
};

const addMember = async (project, member) => {
        console.log(member)
		var user = await userService.getUserByEmail(member.email)
        project.members.push({ userId: user._id, role: member.role });

        console.log(user)

        console.log(project.members)

    await project.save();
    return project;
};

const deleteMember = async(project, member) => {

	project.members = await project.members.filter((m) => m.userId != member);
    console.log(project.members, member)
	project.save()
	return project.members

}


const searchMemberByName = async (project, name) => {
    return project.members.find((m) => m.name === name);
};

const queryProject = async () => {
    const projects = await Project.paginate(filter, options);
    return projects;
};




module.exports = {
    createProject,
    getProjects,
	deleteProject,
    changeActiveStatus,
    changeStatus,
    getTags,
    addTag,
    deleteTag,
    getTag,
    updateTag,
    getMembers,
    getMemberById,
    addMember,
    updateProjectById,
	getMembersDetail,
	getMemberDetail,
	deleteMember,

    getBoards,
    getBoard,
    addBoard,
    updateBoards,
    deleteBoard


};
