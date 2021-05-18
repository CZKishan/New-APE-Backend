const bcrypt = require('bcryptjs');
const { model } = require('mongoose');

async function convertPassword(password) {
    let pass = await bcrypt.hash(password, 10);
    return pass;
}

function isValidEmail(email) {
    var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    return new RegExp(pattern).test(email);
}

function verifyPassword(user, isExist) {
    
    return bcrypt.compare(user.password, isExist.password);
}

module.exports = {

    convertPassword,

    isValidEmail,
 
    verifyPassword,

}