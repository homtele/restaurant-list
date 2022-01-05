const Restaurant = require('../restaurant.js')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  restaurantList.results.forEach(restaurant => {
    const { name, category, image, location, phone, google_map, rating, description } = restaurant
    Restaurant.create({ name, category, image, location, phone, google_map, rating, description })
  })
  console.log('Done!')
})
