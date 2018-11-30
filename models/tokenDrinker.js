mongoose = require("mongoose")
Schema = mongoose.Schema

var tokenDrinker = mongoose.model('tokensDrinkers', new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Drinker' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
}),'tokensDrinkers')


module.exports = tokenDrinker