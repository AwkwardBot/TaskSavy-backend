const axios = require('axios');
const config = require('../config/config');
const ApiError = require('../utils/ApiError')


const sendBirdApiHeaders ={
    'Api-Token': `${config.sendbird_api_token}`,
    'Content-Type': 'application/json',
}

const getAllUsers = async (user) => {

    try {
        const userResponse = await axios.get( `${config.sendbird_base_url}/v3/users`, 
        
        { headers: sendBirdApiHeaders});


        return userResponse.data.users


    } catch (e) {
        return {
            error: true,
            message:  e.response.data.message ?? e.response.message
        }
    }
}

const createUser = async (userBody) => {
    try {
        const userResponse = await axios.post( `${config.sendbird_base_url}/v3/users`,
        {  
                user_id: userBody._id,
                nickname: userBody.name,
                profile_url: "",
        },
        { headers: sendBirdApiHeaders});



        return {
            error: false,
            data: userResponse
        }


    } catch (e) {
        console.log(e)
        return {
            error: true,
            message: "Failed"
        }
    }


}



module.exports = {
    getAllUsers,
    createUser
}