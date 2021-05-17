const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: {type: String, required: true },
    email: {type: String, index: { unique: true}, required: true},
    password: {type: String , required: true}
})

module.exports = mongoose.model("User", Schema);
