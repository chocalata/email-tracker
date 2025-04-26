const redis = require('redis')

const client = redis.createClient({
  url: process.env.REDIS_URL
})

client.connect()

client.on('error', (err) => {
  throw new Error(`Redis Client Error: ${err}`)
})

process.on('exit', () => {
  client.quit()
})

const keys = async (pattern) => {
  const keys = await client.keys(pattern)

  return keys
}

const hSet = async (key, fields = {}) => {
  //transform fields to string
  for (const field in fields) {
    if (typeof fields[field] === 'object') {
      fields[field] = JSON.stringify(fields[field])
    }
  }

  await client.hSet(key, fields)
}

const hGetAll = async (key) => {
  const value = await client.hGetAll(key.toString())

  return value
}

const del = async (key) => {
  await client.del(key)
}

const expire = async (key, expirationTime) => {
  await client.expire(key, expirationTime)
}

module.exports = { hSet, hGetAll, keys, del, expire }
