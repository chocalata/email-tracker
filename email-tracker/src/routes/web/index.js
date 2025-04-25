const crypto = require('crypto')

const userService = require('../../service/user-service')

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const TRACKING_EXPIRATION_DAYS =
  parseInt(process.env.TRACKING_EXPIRATION_DAYS) + 1

const NODE_ENV = process.env.NODE_ENV

module.exports = function routes() {
  const router = require('express').Router()

  const userIdentificationMiddleware = (req, res, next) => {
    const userId = req.signedCookies.userId
    let userTheme = req.cookies.userTheme

    if (!userId) {
      const newUserId = crypto.randomUUID()
      res.cookie('userId', newUserId, {
        signed: true,
        maxAge: 24 * 60 * 60 * 1000 * TRACKING_EXPIRATION_DAYS,
        httpOnly: true,
        secure: NODE_ENV === 'PROD'
      })
    } else {
      res.cookie('userId', userId, {
        signed: true,
        maxAge: 24 * 60 * 60 * 1000 * TRACKING_EXPIRATION_DAYS,
        httpOnly: true,
        secure: NODE_ENV === 'PROD'
      })
    }

    if (!userTheme) {
      userTheme = 'dark'
      res.cookie('userTheme', userTheme, { signed: false, maxAge: ONE_YEAR })
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
