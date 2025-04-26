const redis = require('../repository/redis')

const TRACKING_EMAILS_LIMIT = process.env.TRACKING_EMAILS_LIMIT || 5

const checkUserTrackingLimit = async (userId) => {
  const keys = await redis.keys(`${userId}__*`)

  if (keys.length > TRACKING_EMAILS_LIMIT) {
    return false
  }

  return true
}

const getUserTrackingData = async (userId) => {
  const keys = await redis.keys(`${userId}__*`)

  if (keys.length === 0) {
    return null
  }

  const trackingData = []

  for (const key of keys) {
    const trackingId = key.split('__')[1]
    const data = await redis.hGetAll(key)

    data.dates = JSON.parse(data.dates)
    data.count = parseInt(data.count)

    trackingData.push({ trackingId, data })
  }

  return trackingData
}

const startTracking = async (userId, trackingId) => {
  //hset userId__trackingId status on
  const redisKey = `${userId}__${trackingId}`

  await redis.hSet(redisKey, {
    status: 'on'
  })
}

const stopTracking = async (userId, trackingId) => {
  //hset userId__trackingId status off
  const redisKey = `${userId}__${trackingId}`

  await redis.hSet(redisKey, {
    status: 'off'
  })
}

const deleteTracking = async (userId, trackingId) => {
  //del userId__trackingId
  const redisKey = `${userId}__${trackingId}`

  await redis.del(redisKey)
}

module.exports = {
  checkUserTrackingLimit,
  getUserTrackingData,
  startTracking,
  stopTracking,
  deleteTracking
}
