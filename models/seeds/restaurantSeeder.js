const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const db = require('../../config/mongoose.js')

const restaurantList = require('./restaurant.json').results

db.once('open', async () => {
  try {
    await User.create({ email: 'user1@example.com', password: '12345678' }).then(user => {
      const userID = user._id
      return Promise.all(restaurantList.slice(0, 3).map(restaurant => {
        const { name, category, image, location, phone, google_map: googleMap, rating, description } = restaurant
        return Restaurant.create({ userID, name, category, image, location, phone, googleMap, rating, description })
      }))
    })
    await User.create({ email: 'user2@example.com', password: '12345678' }).then(user => {
      const userID = user._id
      return Promise.all(restaurantList.slice(3, 6).map(restaurant => {
        const { name, category, image, location, phone, google_map: googleMap, rating, description } = restaurant
        return Restaurant.create({ userID, name, category, image, location, phone, googleMap, rating, description })
      }))
    })
    await User.create({ email: '123@123', password: '123' }).then(user => {
      const userID = user._id
      return Promise.all(restaurantList.map(restaurant => {
        const { name, category, image, location, phone, google_map: googleMap, rating, description } = restaurant
        return Restaurant.create({ userID, name, category, image, location, phone, googleMap, rating, description })
      }))
    })
    console.log('Done!')
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
