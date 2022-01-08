const express = require('express')
const router = express.Router()
const { authenticator } = require('../middlewares/auth.js')

const home = require('./modules/home.js')
const restaurants = require('./modules/restaurants.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth.js')

const AppError = require('../error/apperror.js')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use((req, res, next) => {
  next(new AppError(404, '無法連線到此頁面。'))
})
router.use((err, req, res, next) => {
  if (err) {
    res.status(err.code).render('error', { err })
    return
  }
  res.status(500).render('error', { err: new AppError(500, '伺服器錯誤。') })
})

module.exports = router
