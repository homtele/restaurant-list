const express = require('express')
const router = express.Router()

const AppError = require('../../error/apperror.js')
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id([0-9a-f]{24})', (req, res, next) => {
  Restaurant.findOne({ _id: req.params.id, userID: req.user._id }).lean().then(restaurant => {
    if (!restaurant) {
      next(new AppError(404, '無法連線到此頁面。'))
      return
    }
    return res.render('show', { restaurant })
  }).catch(error => console.error(error))
})

router.get('/:id([0-9a-f]{24})/edit', (req, res, next) => {
  Restaurant.findOne({ _id: req.params.id, userID: req.user._id }).lean().then(restaurant => {
    if (!restaurant) {
      next(new AppError(404, '無法連線到此頁面。'))
      return
    }
    return res.render('edit', { restaurant })
  }).catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const { name, category, image, location, phone, googleMap, rating, description } = req.body
  Restaurant.create({ userID: req.user._id, name, category, image, location, phone, googleMap, rating, description }).then(() => {
    return res.redirect('/')
  }).catch(error => console.error(error))
})

router.put('/:id([0-9a-f]{24})', (req, res, next) => {
  const { name, category, image, location, phone, googleMap, rating, description } = req.body
  Restaurant.findOneAndUpdate({ _id: req.params.id, userID: req.user._id }, { name, category, image, location, phone, googleMap, rating, description }).then(restaurant => {
    if (!restaurant) {
      next(new AppError(404, '無法連線到此頁面。'))
      return
    }
    return res.redirect('/')
  }).catch(error => console.error(error))
})

router.delete('/:id([0-9a-f]{24})', (req, res, next) => {
  Restaurant.findOneAndDelete({ _id: req.params.id, userID: req.user._id }).then(restaurant => {
    if (!restaurant) {
      next(new AppError(404, '無法連線到此頁面。'))
      return
    }
    return restaurant.remove()
  }).then(() => {
    return res.redirect('/')
  }).catch(error => console.error(error))
})

module.exports = router
