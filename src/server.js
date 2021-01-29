const express = require('express');
const logger = require('./logger');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');


var corsOptions = {
    exposedHeaders: 'Authorization',
}
const app = express()
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use('/api', require('./routes'))


//DB
const db = require('./db');

const httpServer = http.createServer(app);

module.exports = httpServer;