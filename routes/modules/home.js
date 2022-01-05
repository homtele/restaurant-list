const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find().lean().sort({ name: 'asc' }).then(restaurants => {
    res.render('index', { restaurants, length: restaurants.length })
  }).catch(error => {
    console.error(error)
  })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort
  const select = {
    nameAsc: sort === 'name',
    nameDesc: sort === '-name',
    categoryAsc: sort === 'category',
    ratingDesc: sort === '-rating'
  }
  Restaurant.find().lean().sort(sort).then(restaurants => {
    restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword))
    res.render('index', { keyword, restaurants, select })
  }).catch(error => {
    console.error(error)
  })
})

module.exports = router
