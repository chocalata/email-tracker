const express = require('express')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.set('trust proxy', 1)

app.use(helmet())

app.use(
  cookieParser(process.env.COOKIE_SECRET, {
    //httpOnly: true,
    secure: process.env.NODE_ENV === 'PROD'
  })
)

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
