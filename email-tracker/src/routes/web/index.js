const crypto = require('crypto')

module.exports = function routes() {
  const router = require('express').Router()

  const userIdentificationMiddleware = (req, res, next) => {
    const userId = req.signedCookies.userId

    if (!userId) {
      const newUserId = crypto.randomUUID()
      res.cookie('userId', newUserId, { signed: true })
    }

    next()
  }

  router.use(userIdentificationMiddleware)

  router.get('/', (req, res) => {
    res.render('index')
  })

  return router
}
