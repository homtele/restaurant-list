const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String },
  phone: { type: String },
  googleMap: { type: String },
  rating: { type: Number, required: true },
  description: { type: String }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)
