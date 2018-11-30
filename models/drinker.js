mongoose = require("mongoose")
Schema = mongoose.Schema

var Drinker = mongoose.model('drinkers', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isVerified: { type: Boolean, default: false }
}),'drinkers')


module.exports = Drinker