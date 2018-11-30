mongoose = require("mongoose")
Schema = mongoose.Schema

var Driver = mongoose.model('drivers', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isVerified: { type: Boolean, default: false }
}),'drivers')


module.exports = Driver