const path = require('path')

const trackingService = require('../service/tracking-service')

const IMAGE_PATH = path.join(__dirname, '..', 'tracking-image.png')

module.exports = function routes() {
  const router = require('express').Router()

  const trackingMiddleware = async (req, res, next) => {
    const tracking = req.query.tracking

    if (tracking === 'off') return res.sendFile(IMAGE_PATH)

    res.sendFile(IMAGE_PATH)

    const trackingId = req.params.trackingId

    if (!trackingId) {
      return res
        .status(400)
        .send('Tracking ID is required (/tracking/image/:trackingId)')
    }

    const trackingData = await trackingService.getTrackingData(trackingId)

    console.log('Tracking data:', trackingData)

    if (
      trackingData &&
      trackingData.data.status === trackingService.TRACKING_STATUS.ON
    ) {
      req.trackingData = trackingData
      next()
    }
  }

  router.get('/image{/:trackingId}', trackingMiddleware, (req, res) => {
    const trackingData = req.trackingData.data
    const key = req.trackingData.key

    const date = new Date()

    console.log('Tracking data:', trackingData)

    trackingData.count++

    if (trackingData.firstTime === '') trackingData.firstTime = date

    trackingData.lastTime = date

    trackingData.dates.push(date)

    // save just the 10 most recent dates
    if (trackingData.dates.length > 10) {
      trackingData.dates.shift()
    }

    console.log('Tracking data after update:', trackingData)

    trackingService.addTrackingData(key, trackingData)
  })

  return router
}
