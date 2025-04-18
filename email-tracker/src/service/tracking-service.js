const crypto = require('crypto')

const TRACKING_EXPIRATION_DAYS = process.env.TRACKING_EXPIRATION_DAYS || 3

const TRACKING_EXPIRATION_TIME = 60 * 60 * 24 * TRACKING_EXPIRATION_DAYS

const redis = require('../repository/redis')

const TRACKING_STATUS = {
  ON: 'on',
  OFF: 'off'
}

const getTrackingData = async (trackingId) => {
  console.log('Getting tracking data for ID:', trackingId)

  const keys = await redis.keys(`*__${trackingId}`)

  if (keys.length === 0 || keys.length > 1) {
    console.log('No keys found for tracking ID:', trackingId)
    return null
  }

  const redisKey = keys[0]

  const trackingData = await redis.hGetAll(redisKey)

  //transform trackingData.dates from string to array and count to int

  trackingData.dates = JSON.parse(trackingData.dates)
  trackingData.count = parseInt(trackingData.count)

  return { key: redisKey, data: trackingData }
}

const addTrackingData = async (key, data) => {
  console.log('Adding tracking data for key:', key)

  data.firstTime =
    typeof data.firstTime === 'object'
      ? data.firstTime.toISOString()
      : data.firstTime
  data.lastTime = data.lastTime.toISOString()
  data.dates = JSON.stringify(data.dates)

  await redis.hSet(key, data)
}

const initTrackingData = async (userId) => {
  // generate an uuid4 trackingId
  const trackingId = crypto.randomUUID()

  const date = new Date()

  const createdAt = date.toISOString()
  const expiresAt = new Date(
    date.getTime() + TRACKING_EXPIRATION_TIME * 1000
  ).toISOString()

  console.log(
    'Initializing tracking data for ID:',
    trackingId,
    'User ID:',
    userId
  )

  const redisKey = `${userId}__${trackingId}`

  await redis.hSet(redisKey, {
    status: TRACKING_STATUS.OFF,
    count: 0,
    createdAt: createdAt,
    expiresAt: expiresAt,
    firstTime: '',
    lastTime: '',
    dates: []
  })

  await redis.expire(redisKey, TRACKING_EXPIRATION_TIME)

  return trackingId
}

module.exports = {
  getTrackingData,
  initTrackingData,
  addTrackingData,
  TRACKING_STATUS
}
