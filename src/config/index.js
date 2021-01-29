const server = require('./server')
const db = require('./db')
const cache = require('./cache')
const auth = require('./auth')


const config = Object.assign({}, server, db, cache, auth);
module.exports = config;