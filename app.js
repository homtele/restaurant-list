const express = require('express')
const app = express()
const routes = require('./routes')
require('./config/mongoose')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(3000, () => {
  console.log('The server is listening on http://localhost:3000')
})
