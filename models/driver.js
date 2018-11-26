mongoose = require("mongoose")
Schema = mongoose.Schema

var Driver = mongoose.model('drivers', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}),'drivers')


module.exports = Driver