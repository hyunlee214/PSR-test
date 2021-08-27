const { Log } = require('../models')
const resp = require('./response')

const createLogAPI = async (logTypeId, contents, req) => {
  const userAgent = req.headers['user-agent']
  const ipAddress = req.connection.remoteAddress
  try { return await Log.create({ logTypeId, contents, userAgent, ipAddress }) } catch (e) { throw new Error(e) }
}

const createLog = async (req, res, next) => {
  const { id, contents } = req.body
  if(!id || !contents || !userAgent || !ipAddress) return resp(res, 500, false)
  createLogAPI(id, contents, req)
  return resp(res, 200, true)
}

const assign = async (req, res, next) => {
  createLogAPI('1', 'click', req)
  return resp(res, 200, true)
}
const readRoom = async (req, res, next) => {
  createLogAPI('6', req.params.id, req)
  return resp(res, 200, true)
}

const readAdRoom = async (req, res, next) => {
  createLogAPI('6', `ad ${req.params.id}`, req)
  return resp(res, 200, true)
}

const checkWish = async (req, res, next) => {
  createLogAPI('3', `${req.params.id} wish`, req)
  return resp(res, 200, true)
}
const unCheckWish = async (req, res, next) => {
  createLogAPI('3', `${req.params.id} unWish`, req)
  return resp(res, 200, true)
}
const getPhoneNumber = async (req, res, next) => {
  createLogAPI('2', req.params.id, req)
  return resp(res, 200, true)
}
const searchRoom = async (req, res, next) => {
  createLogAPI('6', JSON.stringify(req.body),req)
  return resp(res, 200, true)
}

module.exports = {
  createLogAPI,
  createLog,
  assign,
  readRoom,
  readAdRoom,
  checkWish,
  unCheckWish,
  getPhoneNumber,
  searchRoom
}
