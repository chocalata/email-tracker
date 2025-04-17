const redis = require('../repository/redis')

const TRACKING_EMAILS_LIMIT = process.env.TRACKING_EMAILS_LIMIT || 5

const checkUserTrackingLimit = async (userId) => {
  console.log('Checking user tracking limit for user ID:', userId)

  const keys = await redis.keys(`${userId}__*`)

  if (keys.length > TRACKING_EMAILS_LIMIT) {
    console.log('User has reached the tracking limit:', keys.length)
    return false
  }

  return true
}

const getUserTrackingData = async (userId) => {
  console.log('Getting user tracking data for user ID:', userId)

  const keys = await redis.keys(`${userId}__*`)

  if (keys.length === 0) {
    console.log('No tracking data found for user ID:', userId)
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
  console.log(
    'Starting tracking for user ID:',
    userId,
    'Tracking ID:',
    trackingId
  )

  const redisKey = `${userId}__${trackingId}`

  await redis.hSet(redisKey, {
    status: 'on'
  })
}

const stopTracking = async (userId, trackingId) => {
  //hset userId__trackingId status off
  console.log(
    'Stopping tracking for user ID:',
    userId,
    'Tracking ID:',
    trackingId
  )

  const redisKey = `${userId}__${trackingId}`

  await redis.hSet(redisKey, {
    status: 'off'
  })
}

const deleteTracking = async (userId, trackingId) => {
  //del userId__trackingId
  console.log(
    'Deleting tracking for user ID:',
    userId,
    'Tracking ID:',
    trackingId
  )

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
