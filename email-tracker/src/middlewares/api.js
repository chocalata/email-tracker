const crypto = require('crypto')
const userService = require('../service/user-service')

const { USER_ID } = require('../config/cookie')

const apiIdentification = (req, res, next) => {
  const userId = req.signedCookies.userId

  if (!userId) {
    const newUserId = crypto.randomUUID()
    res.cookie(USER_ID.name, newUserId, USER_ID.options)
  }

  next()
}

const checkTrackingLimit = async (req, res, next) => {
  const userId = req.signedCookies.userId

  if (!userId || userId === '') {
    return res.status(400).send('User ID is required')
  }

  const limitReached = await userService.checkUserTrackingLimit(userId)

  if (!limitReached) {
    return res.status(400).send('User has reached the tracking limit')
  }

  next()
}

module.exports = { apiIdentification, checkTrackingLimit }
