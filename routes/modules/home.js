const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find({ userID: req.user._id }).lean().sort({ name: 'asc' }).then(restaurants => {
    return res.render('index', { restaurants })
  }).catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const sort = req.query.sort
  const select = {
    nameAsc: sort === 'name',
    nameDesc: sort === '-name',
    categoryAsc: sort === 'category',
    ratingDesc: sort === '-rating'
  }
  Restaurant.find({
    userID: req.user._id,
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  }).lean().sort(sort).then(restaurants => {
    return res.render('index', { keyword, select, restaurants })
  }).catch(error => console.error(error))
})

module.exports = router
