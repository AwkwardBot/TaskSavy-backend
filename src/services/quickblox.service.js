const axios = require('axios');
const config = require('../config/config');
const ApiError = require('../utils/ApiError')

const getAllUsers = async () => {
    try {
        const userResponse = await axios.get(`${config.quickblox_base_url}/users`, {
            headers: quickbloxApiHeaders(),
        })

        return userResponse.data;
    } catch (e) {
        console.log(e.response.data);
        return false;
    }
}

const registerUser = async(user) => {
    try {
        const userResponse = await axios.post(`${config.quickblox_base_url}/users.json`, {
            user: {
                'login': user.email,
                'password': 'password',
                'full_name': user.full_name,
            },
          
        }, {
            headers: quickbloxApiHeaders(),
        });

        return {
            success: true,
            message: 'Success',
            data: userResponse.data,
        } 
    } catch (e) {
        console.log(e.message)
        
        return {
            success: true,
            message: 'Success',
        }
        
            
    }
}

const quickbloxApiHeaders = (setOnBehalfHeader = false, userId = null) => {
    const headers = {
        'Authorization': `ApiKey ${config.quickblox_api_key}`,
        'Content-Type': 'application/json',
    };

    if(setOnBehalfHeader) 
        headers['On-Behalf-Of'] = userId;

    return headers;
}

module.exports= {
    getAllUsers,
    registerUser,
}