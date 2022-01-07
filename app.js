const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const usePassport = require('./config/passport.js')
const routes = require('./routes/index.js')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

function AppError (code, message) {
  this.code = code
  this.message = message
}

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true, flash: true }))
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
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.code).render('error', { err })
    return
  }
  res.status(500).render('error', { err: new AppError(500, '伺服器錯誤。') })
})

app.listen(process.env.PORT, () => {
  console.log(`The server is listening on http://localhost:${process.env.PORT}`)
})
