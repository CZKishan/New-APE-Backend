const router = require("express").Router();
const validators = require('./userValidator');
const facade = require('./userFacade');
const mapper = require('./userMapper');
const usrConst = require('./userConstants');
const appUtils = require('../appUtils');

router.route('/register').post([validators.checkUserRegisterRequest], (req, res) => {

    let details = req.body;

    facade.registerUser(details).then((result) => {

        res.send(result)
    }).catch((err) => {

        console.log({ err });
        res.send(mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.InternalServerError))
    })
})

router.route('/login').post([validators.checkLoginRequest], (req, res) => {

    let details = req.body;

    facade.login(details).then((result) => {
        res.send(result)
    }).catch((err) => {

        res.send(mapper.responseMapping(usrConst.CODE.INTRNLSRVR, usrConst.MESSAGE.InternalServerError))
    })
})

module.exports = router