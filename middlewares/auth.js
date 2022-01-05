module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_message', '請登入以使用這個網站。')
    return res.redirect('/users/login')
  }
}
