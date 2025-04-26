const trackingService = require('../service/tracking-service')

const { checkTracking } = require('../middlewares/tracking')

module.exports = function routes() {
  const router = require('express').Router()

  router.get('/image{/:trackingId}', checkTracking, (req, res) => {
    const trackingData = req.trackingData.data
    const key = req.trackingData.key

    const date = new Date()

    trackingData.count++

    if (trackingData.firstTime === '') trackingData.firstTime = date

    trackingData.lastTime = date

    trackingData.dates.push(date)

    // save just the 10 most recent dates
    if (trackingData.dates.length > 10) {
      trackingData.dates.shift()
    }

    trackingService.addTrackingData(key, trackingData)
  })

  return router
}
