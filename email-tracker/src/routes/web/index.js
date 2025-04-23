const crypto = require('crypto')

const userService = require('../../service/user-service')

module.exports = function routes() {
  const router = require('express').Router()

  const userIdentificationMiddleware = (req, res, next) => {
    const userId = req.signedCookies.userId
    let userTheme = req.cookies.userTheme

    if (!userId) {
      const newUserId = crypto.randomUUID()
      res.cookie('userId', newUserId, { signed: true })
    }

    if (!userTheme) {
      userTheme = 'dark'
      res.cookie('userTheme', userTheme, { signed: false })
    }

    res.locals.userTheme = userTheme

    next()
  }

  router.use(userIdentificationMiddleware)

  router.get('/', (req, res) => {
    const userId = req.signedCookies.userId

    userService.getUserTrackingData(userId).then((trackingData) => {
      res.render('index', { trackingData: trackingData })
    })
  })

  return router
}
