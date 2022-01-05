const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email }).then(user => {
      if (!user) {
        return done(null, false, { message: '你輸入的電子郵件地址並未與帳號連結。' })
      }
      if (password !== user.password) {
        return done(null, false, { message: '你所輸入的密碼錯誤。' })
      }
      return done(null, user)
    }).catch(err => {
      return done(err)
    })
  }))
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      return done(null, user)
    }).catch(err => {
      done(err)
    })
  })
}
