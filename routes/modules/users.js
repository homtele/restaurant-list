const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user.js')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email) {
    errors.push({ message: '請設定電子郵件地址。' })
  }
  if (!password) {
    errors.push({ message: '請設定密碼。' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '你輸入的電子郵件已經註冊。' })
    }
    if (password && password !== confirmPassword) {
      errors.push({ message: '你所輸入的密碼不一致。' })
    }
    if (errors.length) {
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    if (password === confirmPassword) {
      bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(password, salt)
      }).then(hash => {
        return User.create({ name, email, password: hash })
      }).then(user => {
        req.flash('success_message', '註冊成功，請登入帳號。')
        return res.redirect('/users/login')
      })
    }
    return res.render('register', { name, email, password, confirmPassword })
  }).catch(err => console.error(err))
})

router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.post('/logout', (req, res) => {
  req.flash('success_message', '登出成功。')
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
