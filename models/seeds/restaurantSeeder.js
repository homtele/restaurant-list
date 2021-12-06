const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB is connected!')
  restaurantList.results.forEach(restaurant => {
    const { name, category, image, location, phone, google_map, rating, description } = restaurant
    Restaurant.create({ name, category, image, location, phone, google_map, rating, description })
  })
  console.log('Done!')
})
