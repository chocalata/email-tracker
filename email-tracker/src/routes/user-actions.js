const trackingService = require('../service/tracking-service')

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

  const checkTrackingLimit = async (req, res, next) => {
    const userId = req.signedCookies.userId

    if (!userId || userId === '') {
      console.log('User ID is required')
      return res.status(400).send('User ID is required')
    }

    const limitReached = await trackingService.checkUserTrackingLimit(userId)

    if (!limitReached) {
      console.log('User has reached the tracking limit')
      return res.status(400).send('User has reached the tracking limit')
    }

    next()
  }

  router.post(
    '/image/create',
    userIdentificationMiddleware,
    checkTrackingLimit,
    async (req, res) => {
      const userId = req.signedCookies.userId

      const trackingId = await trackingService.initTrackingData(userId)

      res.status(200).send({ trackingId: trackingId })
    }
  )

  return router
}
