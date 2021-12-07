const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id).lean().then(restaurant => {
    res.render('show', { restaurant })
  }).catch(error => {
    console.error(error)
  })
})

router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id).lean().then(restaurant => {
    res.render('edit', { restaurant })
  }).catch(error => {
    console.error(error)
  })
})
router.post('/', (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.create({ name, category, image, location, phone, google_map, rating, description }).then(() => {
    res.redirect('/')
  }).catch(error => {
    console.error(error)
  })
})

router.put('/:id', (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.findById(req.params.id).then(restaurant => {
    restaurant.name = name
    restaurant.category = category
    restaurant.image = image
    restaurant.location = location
    restaurant.phone = phone
    restaurant.google_map = google_map
    restaurant.rating = rating
    restaurant.description = description
    restaurant.save()
    res.redirect('/')
  }).catch(error => {
    console.error(error)
  })
})

router.delete('/:id', (req, res) => {
  Restaurant.findById(req.params.id).then(restaurant => {
    restaurant.remove()
    res.redirect('/')
  }).catch(error => {
    console.error(error)
  })
})

module.exports = router
