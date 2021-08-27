require('dotenv').config()

const config = {
  "development": {
    "username": process.env.PSRusername,
    "password": process.env.PSRpassword,
    "database": process.env.PSRdatabase,
    "host": process.env.PSRhost,
    "dialect": "mysql"
  }
}

module.exports = config