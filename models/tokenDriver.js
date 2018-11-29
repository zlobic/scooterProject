mongoose = require("mongoose")
Schema = mongoose.Schema

var tokenDriver = mongoose.model('tokens', new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Drinker' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
}),'tokens')


module.exports = tokenDriver