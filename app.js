const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find().lean().then(restaurants => {
    res.render('index', { restaurants })
  }).catch(error => {
    console.error(error)
  })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find().lean().then(restaurants => {
    restaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
    )
    if (restaurants.length === 0) {
      res.render('not-found', { keyword })
    } else {
      res.render('index', { keyword, restaurants })
    }
  }).catch(error => {
    console.error(error)
  })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id).lean().then(restaurant => {
    res.render('show', { restaurant })
  }).catch(error => {
    console.error(error)
  })
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
