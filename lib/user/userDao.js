let BaseDao = require('../dao/BaseDao')
const User = require('../generic/models/userModel')
const usrDao = new BaseDao(User)

function getUserDetails(query) {

    return usrDao.findOne(query)
}

function createUser(obj) {

    let userObj = new User(obj)
    return usrDao.save(userObj)
}


module.exports = {

    getUserDetails,
    createUser
}