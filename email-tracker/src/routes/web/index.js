const { siteIdentification } = require('../../middlewares/site')
const userService = require('../../service/user-service')

const { formatDate } = require('../../utils/date')

module.exports = function routes() {
  const router = require('express').Router()

  router.use(siteIdentification)

  router.get('/', (req, res) => {
    const userId = req.signedCookies.userId

    userService.getUserTrackingData(userId).then((trackingData) => {
      // Order by createdAt descending

      trackingData = trackingData?.sort((a, b) => {
        return new Date(b.data.createdAt) - new Date(a.data.createdAt)
      })

      trackingData = trackingData?.map((entry) => {
        const data = entry.data
        return {
          ...entry,
          data: {
            ...data,
            firstTime: formatDate(data.firstTime),
            createdAt: formatDate(data.createdAt),
            expiresAt: formatDate(data.expiresAt),
            lastTime: formatDate(data.lastTime),
            dates: data.dates.map(formatDate)
          }
        }
      })
      res.render('index', { trackingData: trackingData })
    })
  })

  return router
}
