const path = require('path')

const IMAGE_PATH = path.join(__dirname, '..', 'tracking-image.png')

module.exports = function routes() {
  const router = require('express').Router()

  router.use((req, res, next) => {
    const tracking = req.query.tracking

    if (tracking === 'off') return res.sendFile(IMAGE_PATH)

    next()
  })

  const checkTrackingId = (req, res, next) => {
    // check if trackingId is present in the URL
    const trackingId = req.params.trackingId

    if (!trackingId) {
      return res
        .status(400)
        .send('Tracking ID is required (/tracking/image/:trackingId)')
    }

    console.log('Tracking ID:', trackingId)

    next()
  }

  router.get('/image{/:trackingId}', checkTrackingId, (req, res) => {
    console.log(`Tracking ID: ${req.params.trackingId}`)

    const id = Math.floor(Math.random() * 1000)

    console.log(id)

    res.sendFile(IMAGE_PATH)
  })

  return router
}
