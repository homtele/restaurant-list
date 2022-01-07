const express = require('express')
const router = express.Router()
const { authenticator } = require('../middlewares/auth.js')

const home = require('./modules/home.js')
const restaurants = require('./modules/restaurants.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth.js')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
