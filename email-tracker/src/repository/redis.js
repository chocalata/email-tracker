const redis = require('redis')

TRACKING_EXPIRATION_DAYS = process.env.TRACKING_EXPIRATION_DAYS || 3

const client = redis.createClient({
  url: process.env.REDIS_URL
})

client.connect()

client.on('error', (err) => console.log('Redis Client Error', err))

process.on('exit', () => {
  client.quit()
})

const keys = async (pattern) => {
  const keys = await client.keys(pattern)

  return keys
}

const hSet = async (key, fields = {}) => {
  // Expiration time (3 days in seconds)
  const expirationTime = 60 * 60 * 24 * TRACKING_EXPIRATION_DAYS

  //transform fields to string
  for (const field in fields) {
    if (typeof fields[field] === 'object') {
      fields[field] = JSON.stringify(fields[field])
    }
  }

  await client.hSet(key, fields)
  await client.expire(key, expirationTime)
}

const hGetAll = async (key) => {
  const value = await client.hGetAll(key.toString())

  return value
}

module.exports = { hSet, hGetAll, keys }
