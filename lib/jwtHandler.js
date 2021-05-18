// load all dependencies
const Promise = require("bluebird");
const jwt = Promise.promisifyAll(require("jsonwebtoken"));
const appConstants = require('./constants');

const TOKEN_EXPIRATION_SEC = appConstants.TOKEN_EXPIRATION_TIME * 60;


const genUsrToken = function (user) {
    const options = { expiresIn: TOKEN_EXPIRATION_SEC };
    return jwt.signAsync(user, process.env.user_secret, options)
        .then(function (jwtToken) {

            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException();
        });
};

const genAdminToken = function (admin, setExpire) {
    const options = { expiresIn: TOKEN_EXPIRATION_SEC };
    return jwt.signAsync(admin, process.env.admin_secret, options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException();
        });
};

const verifyUsrToken = function (acsTokn) {
    return jwt.verifyAsync(acsTokn, process.env.user_secret)
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return this.tokenPayload;
        })
        .catch(function (err) {
            return false
        });
};

const verifyAdminToken = function (acsTokn) {
    return jwt.verifyAsync(acsTokn, process.env.admin_secret)
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return tokenPayload;
        })
        .catch(function (err) {
            return false
        });
};

module.exports = {
    genUsrToken,

    verifyUsrToken,

    genAdminToken,

    verifyAdminToken
};
