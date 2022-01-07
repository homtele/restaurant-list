const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

function AppError (code, message) {
  this.code = code
  this.message = message
}

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res, next) => {
  Restaurant.findOne({ _id: req.params.id, userID: req.user._id }).lean().then(restaurant => {
    if (!restaurant) {
      next(new AppError(404, '無法連線到此頁面。'))
      return
    }
    return res.render('show', { restaurant })
  }).catch(error => console.error(error))
})

router.get('/:id/edit', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  const { name, category, image, location, phone, googleMap, rating, description } = req.body
  Restaurant.findOneAndUpdate({ _id: req.params.id, userID: req.user._id }, { name, category, image, location, phone, googleMap, rating, description }).then(restaurant => {
    if (!restaurant) {
      next(new AppError(404, '無法連線到此頁面。'))
      return
    }
    return res.redirect('/')
  }).catch(error => console.error(error))
})

router.delete('/:id', (req, res, next) => {
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
