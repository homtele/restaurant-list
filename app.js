const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const usePassport = require('./config/passport.js')
const routes = require('./routes/index.js')
require('./config/mongoose.js')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, flash: true }))
app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_message = req.flash('success_message')
  res.locals.warning_message = req.flash('warning_message')
  next()
})
app.use(routes)

app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000')
})
