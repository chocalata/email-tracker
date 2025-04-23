const userService = require('../service/user-service')
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

    const limitReached = await userService.checkUserTrackingLimit(userId)

    if (!limitReached) {
      console.log('User has reached the tracking limit')
      return res.status(400).send('User has reached the tracking limit')
    }

    next()
  }

  router.post(
    '/tracker/create',
    userIdentificationMiddleware,
    checkTrackingLimit,
    async (req, res) => {
      const userId = req.signedCookies.userId

      const trackingId = await trackingService.initTrackingData(userId)

      res.status(200).send({ trackingId: trackingId })
    }
  )

  router.post(
    '/tracker/start',
    userIdentificationMiddleware,
    async (req, res) => {
      const userId = req.signedCookies.userId
      const trackingId = req.body.trackingId

      if (!trackingId) {
        console.log('Tracking ID is required')
        return res.status(400).send('Tracking ID is required')
      }

      const trackingData = await userService.startTracking(userId, trackingId)

      res.status(200).send(trackingData)
    }
  )

  router.post(
    '/tracker/stop',
    userIdentificationMiddleware,
    async (req, res) => {
      const userId = req.signedCookies.userId
      const trackingId = req.body.trackingId

      if (!trackingId) {
        console.log('Tracking ID is required')
        return res.status(400).send('Tracking ID is required')
      }

      const trackingData = await userService.stopTracking(userId, trackingId)

      res.status(200).send(trackingData)
    }
  )

  router.delete(
    '/tracker/delete',
    userIdentificationMiddleware,
    async (req, res) => {
      const userId = req.signedCookies.userId
      const trackingId = req.body.trackingId

      if (!trackingId) {
        console.log('Tracking ID is required')
        return res.status(400).send('Tracking ID is required')
      }

      const trackingData = await userService.deleteTracking(userId, trackingId)

      res.status(200).send(trackingData)
    }
  )

  router.patch(
    '/change-theme',
    userIdentificationMiddleware,
    async (req, res) => {
      const userId = req.signedCookies.userId
      const newTheme = req.body.theme

      if (!newTheme) {
        console.log('New theme is required')
        return res.status(400).send('New theme is required')
      }

      res.cookie('userTheme', newTheme, { signed: false })
      res.locals.userTheme = newTheme

      res.status(200).send({ message: 'Theme changed successfully' })
    }
  )

  return router
}
