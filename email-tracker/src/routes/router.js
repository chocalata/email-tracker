module.exports = function routes() {
  const router = require('express').Router()

  const tracking = require('./tracking')()
  const web = require('./web/index')()

  router.use('/', web)
  router.use('/tracking', tracking)

  return router
}
