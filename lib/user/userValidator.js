const usrConst = require('./userConstants');
const mapper = require('./userMapper');



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



module.exports = {

    checkUserRegisterRequest,

    checkLoginRequest,
}