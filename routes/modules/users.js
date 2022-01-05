const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user.js')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (!email || !password || !confirmPassword) {
    return res.redirect('/users/login')
  }
  if (password !== confirmPassword) {
    return res.redirect('/users/login')
  }
  User.findOne({ email }).then(user => {
    if (user) {
      return res.redirect('/users/login')
    }
    return User.create({ name, email, password })
  }).then(() => {
    return res.redirect('/')
  }).catch(err => console.error(err))
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
