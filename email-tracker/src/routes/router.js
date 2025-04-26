const expressRateLimit = require('express-rate-limit')
const { apiIdentification } = require('../middlewares/api')

const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
})

module.exports = function routes() {
  const router = require('express').Router()

  const web = require('./web/index')()
  const userActions = require('./user-actions')()
  const tracking = require('./tracking')()

  router.use('/', web)

  // Apply the rate limiting middleware to all requests.
  router.use(limiter)

  router.use('/tracking', tracking)

  router.use(apiIdentification)
  router.use('/user-actions', userActions)

  return router
}
