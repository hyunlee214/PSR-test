const { Room, Location, Pictures, Ad, Sequelize: { Op } } = require('../models')
const { createLogAPI } = require('./log')
const resp = require('./response') 

const readLocation = async (req, res, next) => {
  try {
    const location = await Location.findAll()
    if(location == null) return resp(res, 400, false)
    return resp(res, 200, location)
  } catch (e) { next(e) }
}

const readRoom = async (req, res, next) => { 
  try {
    const room = await Room.findAll()
    if(!room) return resp(res, 400, false)
    createLogAPI(5, 'all', req)
    return resp(res, 200, room)
  } catch (e) { next(e) }
}

const readPictures = async (req, res, next) => { 
  try {
    const { roomId } = req.params
    // createLogAPI(6, roomId, req)
    if(roomId === null) return resp(res, 400, false)
    const pictures = await Pictures.findAll({ attributes: ['id', 'file', 'src'], where: { roomId } })
    if(!pictures) return resp(res, 400, false)
    return resp(res, 200, pictures)
  } catch (e) { next(e) }
}

const createPicture = async (req, res, next) => {
  try {
    const picture = req.files[0]
    const isCreated = await Pictures.create({ file: picture.originalname, src: 'src/' + picture.filename, roomId: req.body.roomId })
    if(!isCreated) throw new Error('upload Error')
    return resp(res, 200, true)
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const deletePicture = async (req, res, next) => {
  try {
    const { id } = req.params
    if(id == null) return resp(res, 400, false)
    
    const pictures = await Pictures.destroy({ where: { id } })
    if(!pictures) return resp(res, 400, false)

    return resp(res, 201, true)
  } catch (e) {
    return resp(res, 500, false)
  }
}

const readAds = async (req, res, next) => {
  try {
    let room = await Ad.findAll({ where: { endDate: { [Op.gt]: new Date(new Date().getTime() + 1000 * 60 * 60 * 9) } }, include: [{ model: Room }] })
    room = room.map(r => { return { id: r.id, name: r.room.name, locationId: r.room.locationId, roomId: r.room.id, longitude: r.room.longitude, latitude: r.room.latitude } })
    if(!room) return resp(res, 400, false)
    return resp(res, 200, room)
  } catch (e) { next(e) }
}


module.exports = {
  readLocation,
  readRoom, 
  createPicture,
  readPictures,
  deletePicture,
  readAds
}
