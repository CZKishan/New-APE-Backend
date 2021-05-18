const usrConst = require('./userConstants');
const mapper = require('./userMapper');
const ObjectId = require('mongoose').Types.ObjectId
const jwtHandler = require('../jwtHandler');

// Validate User Request

function checkUserRegisterRequest(req, res, next) {
    let error = [];
    let details = req.body;

    if (!details || Object.keys(details).length == 0 ) {

        error.push({ responseCode: usrConst.CODE.BadRequest , responseMessage: usrConst.MESSAGE.InvalidDetails })
    }else {
        let {firstname , lastname , email , password} = details;

        if( !firstname || !lastname || !email || !password ) {

            error.push({ responseCode: usrConst.CODE.BadRequest, responseMessage: usrConst.MESSAGE.InvalidDetails })
        }  
    }

    if (error.length > 0) {
        
        res.json(mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails))
    }else {

        next();
    }
}


// login User

function checkLoginRequest(req, res, next) {
    let error = [];
    
    let { email, password } = req.body;

    if( !email && !password) {

        error.push({ responseCode: usrConst.CODE.BadRequest, responseMessage: usrConst.MESSAGE.InvalidDetails })
    }

    if(error.length > 0) {
        
        res.json(mapper.responseMapping(usrConst.CODE.BadRequest, usrConst.MESSAGE.InvalidDetails))
    }else {

        next();
    }

}

/**
 * Validate JWT token
 */
 function checkToken(req, res, next) {

    let token = req.headers['authorization']
    let { id } = req.params

    if (!token || !id || (!ObjectId.isValid(id))) {

        res.send(mapper.responseMapping(usrConst.CODE.FRBDN, usrConst.MESSAGE.TOKEN_NOT_PROVIDED))

        // return new exceptions.unauthorizeAccess(busConst.MESSAGE.TOKEN_NOT_PROVIDED)
    } else {

        return jwtHandler.verifyUsrToken(token).then((result) => {

            if (result && result._id == id) {

                req.tokenPayload = result;
                next()
            } else {

                res.send(mapper.responseMapping(usrConst.CODE.FRBDN, usrConst.MESSAGE.TOKEN_NOT_PROVIDED))
            }
        })
    }
}

module.exports = {

    checkUserRegisterRequest,

    checkLoginRequest,

    checkToken,
}