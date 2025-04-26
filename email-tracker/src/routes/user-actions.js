const { checkTrackingLimit } = require('../middlewares/api')
const userService = require('../service/user-service')
const trackingService = require('../service/tracking-service')
const { USER_THEME } = require('../config/cookie')

module.exports = function routes() {
  const router = require('express').Router()

  router.post('/tracker/create', checkTrackingLimit, async (req, res) => {
    const userId = req.signedCookies.userId

    const trackingId = await trackingService.initTrackingData(userId)

    res.status(200).send({ trackingId: trackingId })
  })

  router.post('/tracker/start', async (req, res) => {
    const userId = req.signedCookies.userId
    const trackingId = req.body.trackingId

    if (!trackingId) {
      return res.status(400).send('Tracking ID is required')
    }

    const trackingData = await userService.startTracking(userId, trackingId)

    res.status(200).send(trackingData)
  })

  router.post('/tracker/stop', async (req, res) => {
    const userId = req.signedCookies.userId
    const trackingId = req.body.trackingId

    if (!trackingId) {
      return res.status(400).send('Tracking ID is required')
    }

    const trackingData = await userService.stopTracking(userId, trackingId)

    res.status(200).send(trackingData)
  })

  router.delete('/tracker/delete', async (req, res) => {
    const userId = req.signedCookies.userId
    const trackingId = req.body.trackingId

    if (!trackingId) {
      console.log('Tracking ID is required')
      return res.status(400).send('Tracking ID is required')
    }

    const trackingData = await userService.deleteTracking(userId, trackingId)

    res.status(200).send(trackingData)
  })

  router.patch('/change-theme', async (req, res) => {
    const newTheme = req.body.theme

    if (!newTheme) {
      return res.status(400).send('New theme is required')
    }

    res.cookie(USER_THEME.name, newTheme, USER_THEME.options)
    res.locals.userTheme = newTheme

    res.status(200).send({ message: 'Theme changed successfully' })
  })

  return router
}
