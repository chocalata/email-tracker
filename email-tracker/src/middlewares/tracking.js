const path = require('path')

const trackingService = require('../service/tracking-service')

const IMAGE_PATH = path.join(__dirname, '..', 'tracking-image.png')

const checkTracking = async (req, res, next) => {
  const tracking = req.query.tracking
  const trackingId = req.params.trackingId

  if (!trackingId) {
    return res
      .status(400)
      .send('Tracking ID is required (/tracking/image/:trackingId)')
  }

  if (tracking === 'off') return res.sendFile(IMAGE_PATH)

  res.sendFile(IMAGE_PATH)

  const trackingData = await trackingService.getTrackingData(trackingId)

  if (
    trackingData &&
    trackingData.data.status === trackingService.TRACKING_STATUS.ON
  ) {
    req.trackingData = trackingData
    next()
  }
}

module.exports = { checkTracking }
