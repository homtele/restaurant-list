const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const db = require('../../config/mongoose.js')

const restaurantList = require('./restaurant.json').results

db.once('open', async () => {
  try {
    await bcrypt.genSalt(10).then(salt => {
      return bcrypt.hash('12345678', salt)
    }).then(hash => {
      return User.create({ email: 'user1@example.com', password: hash })
    }).then(user => {
      const userID = user._id
      return Promise.all(restaurantList.slice(0, 3).map(restaurant => {
        const { name, category, image, location, phone, google_map: googleMap, rating, description } = restaurant
        return Restaurant.create({ userID, name, category, image, location, phone, googleMap, rating, description })
      }))
    })
    await bcrypt.genSalt(10).then(salt => {
      return bcrypt.hash('12345678', salt)
    }).then(hash => {
      return User.create({ email: 'user2@example.com', password: hash })
    }).then(user => {
      const userID = user._id
      return Promise.all(restaurantList.slice(3, 6).map(restaurant => {
        const { name, category, image, location, phone, google_map: googleMap, rating, description } = restaurant
        return Restaurant.create({ userID, name, category, image, location, phone, googleMap, rating, description })
      }))
    })
    await bcrypt.genSalt(10).then(salt => {
      return bcrypt.hash('1', salt)
    }).then(hash => {
      return User.create({ email: '1@1', password: hash })
    }).then(user => {
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
