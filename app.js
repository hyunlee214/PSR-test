require('dotenv').config()
const express       = require('express')
const path          = require('path')
const logger        = require('morgan')
const { sequelize } = require('./models')
const cors          = require('cors')

const logAPI    = require('./api/log')
const roomAPI   = require('./api/room')
const uploadPicture = require('./api/upload')
const clientApp = path.join(__dirname, 'client/build')

const app = express()
sequelize.sync()

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use('/src', express.static(__dirname + '/src' ))
  .use(express.static(clientApp))
  .use(cors())

app

/* RenderFile */
  .get('/',         (req, res) => { return res.sendFile(path.join(clientApp, 'index.html'))})
  .get('/Room',     (req, res) => { return res.sendFile(path.join(clientApp, 'index.html'))})
  .get('/Intro',    (req, res) => { return res.sendFile(path.join(clientApp, 'index.html'))})
  .get('/Search',   (req, res) => { return res.sendFile(path.join(clientApp, 'index.html'))})
  .get('/WishList', (req, res) => { return res.sendFile(path.join(clientApp, 'index.html'))})
/* API */
  .get('/location/read', roomAPI.readLocation)
  .get('/room/read', roomAPI.readRoom)
  .get('/ads', roomAPI.readAds)
  .get('/pictures/read/:roomId', roomAPI.readPictures)

  .post('/5a2191d5b6166491253b000ba30c1ab1', uploadPicture, roomAPI.createPicture)
  .get('/52c3455f75963190d83eb69d59796e8c/:id', roomAPI.deletePicture)
  
  .get('/v1/assign', logAPI.assign)
  .get('/v1/readRoom/:id', logAPI.readRoom)
  .get('/v1/readAdRoom/:id', logAPI.readAdRoom)
  .get('/v1/checkWish/:id', logAPI.checkWish)
  .get('/v1/unCheckWish/:id', logAPI.unCheckWish)
  .get('/v1/getPhoneNumber/:id', logAPI.getPhoneNumber)
  .post('/v1/searchRoom', logAPI.searchRoom)

app
  .use((req, res, next) => { next() }) 
  .use((err, req, res, next) => {
    console.error(err)
    return res.status(err.status || 500).json({ result: 'error' })
  })

module.exports = app
