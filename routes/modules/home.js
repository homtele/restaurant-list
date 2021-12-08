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
  switch (sort) {
    case 'name_asc':
      Restaurant.find().lean().sort({ name: 'asc' }).then(restaurants => {
        restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword))
        res.render('index', { keyword, restaurants, nameAsc: true })
      }).catch(error => {
        console.error(error)
      })
      break
    case 'name_desc':
      Restaurant.find().lean().sort({ name: 'desc' }).then(restaurants => {
        restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword))
        res.render('index', { keyword, restaurants, nameDesc: true })
      }).catch(error => {
        console.error(error)
      })
      break
    case 'category_asc':
      Restaurant.find().lean().sort({ category: 'asc' }).then(restaurants => {
        restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword))
        res.render('index', { keyword, restaurants, categoryAsc: true })
      }).catch(error => {
        console.error(error)
      })
      break
    case 'rating_desc':
      Restaurant.find().lean().sort({ rating: 'desc' }).then(restaurants => {
        restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword))
        res.render('index', { keyword, restaurants, ratingDesc: true })
      }).catch(error => {
        console.error(error)
      })
      break
    default:
      res.redirect('/')
  }
})

module.exports = router
