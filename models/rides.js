mongoose = require("mongoose")
var Schema = mongoose.Schema

var requestedRides = mongoose.model('rides', new Schema({
    originGeoCode: String,
    destinationGeoCode: String,
    originAdress: String,
    destinationAdress: String,
    travelDistance: Number,
    travelDuration: Number,
    priceOfRide: Number
}),'rides')

module.exports = requestedRides