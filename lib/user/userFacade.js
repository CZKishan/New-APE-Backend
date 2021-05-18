const userService = require('./userService');

function registerUser(details) {

    return userService.registerUser(details).then(data => data)
}

function login(details) {
    
    return userService.login(details).then(data => data)
}

function getUserDetails(id) {
    return userService.getUserDetails(id).then(data => data)
}

module.exports = {

    registerUser,

    login,

    getUserDetails,
        
}