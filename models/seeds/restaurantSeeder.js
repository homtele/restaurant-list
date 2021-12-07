const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant')
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.results.forEach(restaurant => {
    const { name, category, image, location, phone, google_map, rating, description } = restaurant
    Restaurant.create({ name, category, image, location, phone, google_map, rating, description })
  })
  console.log('Done!')
})
