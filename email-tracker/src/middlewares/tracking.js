const { createCanvas } = require('canvas') // npm install canvas

const trackingService = require('../service/tracking-service')
const { getErrorMessage } = require('../utils/json-responses')

const checkTracking = async (req, res, next) => {
  const tracking = req.query.tracking
  const color = `#${req.query.color || 'fff'}`
  const trackingId = req.params.trackingId

  if (!trackingId) {
    return res
      .status(400)
      .json(
        getErrorMessage('Tracking ID is required (/tracking/image/:trackingId)')
      )
  }

  if (!colorFormat(color)) {
    return res
      .status(400)
      .json(
        getErrorMessage(
          'Color format is invalid. Has to be hex and 3 or 6 characters.'
        )
      )
  }

  const pixelBuffer = getPixelColor(color)

  res.setHeader('Content-Type', 'image/png')

  if (tracking === 'off') return res.send(pixelBuffer)

  res.send(pixelBuffer)

  const trackingData = await trackingService.getTrackingData(trackingId)

  if (
    trackingData &&
    trackingData.data.status === trackingService.TRACKING_STATUS.ON
  ) {
    req.trackingData = trackingData
    next()
  }
}

const colorFormat = (color) => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
  return hexColorRegex.test(color)
}

const getPixelColor = (color) => {
  const canvas = createCanvas(1, 1)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)

  return canvas.toBuffer('image/png')
}

module.exports = { checkTracking }
