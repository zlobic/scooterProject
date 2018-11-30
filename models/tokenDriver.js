mongoose = require("mongoose")
Schema = mongoose.Schema

var tokenDriver = mongoose.model('tokensDrivers', new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Driver' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
}),'tokensDrivers')


module.exports = tokenDriver