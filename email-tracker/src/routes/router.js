const expressRateLimit = require('express-rate-limit')

const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 1 minutes
  limit: 100,
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
})

module.exports = function routes() {
  const router = require('express').Router()

  const tracking = require('./tracking')()
  const web = require('./web/index')()
  const userActions = require('./user-actions')()

  router.use('/', web)

  // Apply the rate limiting middleware to all requests.
  router.use(limiter)

  router.use('/user-actions', userActions)
  router.use('/tracking', tracking)

  return router
}
