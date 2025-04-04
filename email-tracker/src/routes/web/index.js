module.exports = function routes() {
  const router = require('express').Router()

  router.get('/', (req, res) => {
    console.log(id)

    res.render('index')
  })

  return router
}
