const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv')
}
const db = require('../../config/mongoose.js')

const User = require('../user.js')
const Restaurant = require('../restaurant.js')

const userList = require('./user.json').results
const restaurantList = require('./restaurant.json').results

db.once('open', () => {
  Promise.all(
    // Outer array: generating user
    userList.map(userItem => {
      return bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(userItem.password, salt)
      }).then(hash => {
        return User.create({ email: userItem.email, password: hash })
      }).then(user => {
        return Promise.all(
          // Inner array: generating restaurant
          restaurantList.filter(restaurantItem => {
            return userItem.restaurantMap.includes(restaurantItem.id)
          }).map(restaurantItem => {
            const { name, category, image, location, phone, google_map: googleMap, rating, description } = restaurantItem
            return Restaurant.create({ userID: user._id, name, category, image, location, phone, googleMap, rating, description })
          })
          // End of inner array
        )
      })
    })
    // End of Outer array
  ).then(() => {
    console.log('Done!')
    process.exit()
  })
})
