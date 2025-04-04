const express = require('express')
const helmet = require('helmet')
const path = require('path')

const app = express()

app.use(helmet()) // Security middleware

const PORT = process.env.PORT || 3000

//CSS paths
app.use('/css', express.static(__dirname + '/public/css'))

//JS paths
app.use('/js', express.static(__dirname + '/public/js'))

//IMG paths
app.use('/img', express.static(__dirname + '/public/img'))

//FONTS paths
app.use('/fonts', express.static(__dirname + '/public/fonts'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const root_routes = require('./routes/router')()
//ENDPOINTS
app.use('/', root_routes)

app.listen(PORT, () => {
  console.log(
    '#############################################################################################################\n#############################################################################################################'
  )
  console.log('## Express is running on port ' + PORT + ' at ' + Date() + ' ##')
  console.log(
    '#############################################################################################################\n#############################################################################################################'
  )
})
