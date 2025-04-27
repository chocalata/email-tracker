const { checkTrackingLimit } = require('../middlewares/api')
const userService = require('../service/user-service')
const trackingService = require('../service/tracking-service')
const { USER_THEME } = require('../config/cookie')
const {
  getErrorMessage,
  getSuccessMessage,
  getSuccessData
} = require('../utils/json-responses')

module.exports = function routes() {
  const router = require('express').Router()

  router.post('/tracker/create', checkTrackingLimit, async (req, res) => {
    const userId = req.signedCookies.userId
    const trackerName = req.body.trackerName

    // Check if has 100 characters. if has more, return error.
    if (trackerName && trackerName.length > 100) {
      return res
        .status(400)
        .json(getErrorMessage('Tracker name is too long (100 characters max)'))
    }

    await trackingService.initTrackingData(userId, trackerName)

    res.status(200).json(getSuccessData('Tracking ID created successfully'))
  })

  router.post('/tracker/start', async (req, res) => {
    const userId = req.signedCookies.userId
    const trackingId = req.body.trackingId

    if (!trackingId) {
      return res.status(400).json(getErrorMessage('Tracking ID is required'))
    }

    await userService.startTracking(userId, trackingId)

    res.status(200).json(getSuccessMessage('Tracking started successfully'))
  })

  router.post('/tracker/stop', async (req, res) => {
    const userId = req.signedCookies.userId
    const trackingId = req.body.trackingId

    if (!trackingId) {
      return res.status(400).json(getErrorMessage('Tracking ID is required'))
    }

    await userService.stopTracking(userId, trackingId)

    res.status(200).json(getSuccessMessage('Tracking stopped successfully'))
  })

  router.delete('/tracker/delete', async (req, res) => {
    const userId = req.signedCookies.userId
    const trackingId = req.body.trackingId

    if (!trackingId) {
      return res.status(400).json(getErrorMessage('Tracking ID is required'))
    }

    await userService.deleteTracking(userId, trackingId)

    res.status(200).json(getSuccessMessage('Tracking deleted successfully'))
  })

  router.patch('/change-theme', async (req, res) => {
    const newTheme = req.body.theme

    if (!newTheme) {
      return res.status(400).json(getErrorMessage('New theme is required'))
    }

    res.cookie(USER_THEME.name, newTheme, USER_THEME.options)
    res.locals.userTheme = newTheme

    res.status(200).json(getSuccessMessage('Theme changed successfully'))
  })

  return router
}
