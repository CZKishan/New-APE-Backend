const mapper = require('./userMapper');
const usrConst = require('./userConstants');
const dao = require('./userDao');
const appUtils = require('../appUtils');
const jwtHandler = require('../jwtHandler');
const ObjectId = require('mongoose').Types.ObjectId

function registerUser(details) {
    if (!details || Object.keys(details).length === 0) {
        return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails);
    }

    if ( details.email) {
        let query = {
            email: details.email
        }

        return dao.getUserDetails(query).then(async (userExists) => {
            if(userExists) {

                return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.EmailAllreadyExist)
            }else {
                let convertedPassword = await appUtils.convertPassword(details.password);
                details.password = convertedPassword;

                details.createdAt = new Date().getTime();

                return dao.createUser(details).then((userCreated) => {

                    if(userCreated) {

                        let filterUserResonseFields = mapper.filterUserResponseFields(userCreated)

                        return mapper.responseMappingWithData(usrConst.CODE.Success, usrConst.MESSAGE.UserCreatedSuccessfully, filterUserResonseFields)

                    }else {

                        return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.InternalServerError)
                    }
                })
            }
        }).catch((err) => {
            console.log({err});
            return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.InternalServerError)
        })
    }
}

function login(details) {
    
    if (!details || Object.keys(details).length == 0) {

        return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails);

    }else {
        
        let query = {};
         
        if (details.email) {
            query.email = details.email;
        }

        return dao.getUserDetails(query).then( async (userDetails) => {

            let filteredUserResponseFields = mapper.filterUserResponseFields(userDetails)
            
                let isValidPassword = await appUtils.verifyPassword(details, userDetails)
            
                if ( !isValidPassword) {
                
                    return mapper.responseMapping(userDetails.CODE.BadRequest, userDetails.MESSAGE.InvalidDetails)
                }else {

                    let usrObj = {
                        _id: userDetails._id,
                        email: userDetails.email
                    }
                        return jwtHandler.genUsrToken(usrObj).then((token) => {

                            filteredUserResponseFields.token = token;

                            return mapper.responseMappingWithData(usrConst.CODE.Success, usrConst.MESSAGE.UserVerifiedSuccess, filteredUserResponseFields)

                        }).catch((err) => {

                            console.log({ err })
                            return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
                        })
                }
        }).catch((err) => {

            console.log({ err })
            return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.internalServerError)
        })
    }
}

function getUserDetails (id) {

    if(!id || !ObjectId.isValid(id)) {

        return mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails)
    
    }else {
        let query = {
            _id: id
        }

        return dao.getUserDetails(query).then((data) => {

            if(data) {

                let filteredUserResponseFields = mapper.filterUserResponseFields(data)
                return mapper.responseMappingWithData(usrConst.CODE.Success, usrConst.MESSAGE.Success, filteredUserResponseFields)
            
            } else {

                return mapper.responseMapping(usrConst.CODE.DataNotFound, usrConst.MESSAGE.UserNotFound)
            } 
        
        }).catch((err) => {

            console.log('err', err);
            return mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.UserNotFound)
        })
    }
}

module.exports = {
    
    registerUser,

    login,

    getUserDetails,

}