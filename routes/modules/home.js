const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find().lean().then(restaurants => {
    res.render('index', { restaurants, length: restaurants.length })
  }).catch(error => {
    console.error(error)
  })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find().lean().then(restaurants => {
    restaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
    )
    res.render('index', { keyword, restaurants, length: restaurants.length })
  }).catch(error => {
    console.error(error)
  })
})

module.exports = router
