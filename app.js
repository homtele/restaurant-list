const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB is connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  Restaurant.find().lean().then(restaurants => {
    res.render('index', { restaurants, length: restaurants.length })
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
    res.render('index', { keyword, restaurants, length: restaurants.length })
  }).catch(error => {
    console.error(error)
  })
})
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id).lean().then(restaurant => {
    res.render('show', { restaurant })
  }).catch(error => {
    console.error(error)
  })
})
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id).lean().then(restaurant => {
    res.render('edit', { restaurant })
  }).catch(error => {
    console.error(error)
  })
})
app.post('/restaurants', (req, res) => {
  console.log(req.body)
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.create({ name, category, image, location, phone, google_map, rating, description }).then(() => {
    res.redirect('/')
  }).catch(error => {
    console.error(error)
  })
})
app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id).then(restaurant => {
    restaurant.remove()
    res.redirect('/')
  }).catch(error => {
    console.error(error)
  })
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
