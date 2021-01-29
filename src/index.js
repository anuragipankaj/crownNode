const dotenv = require('dotenv');
dotenv.config();

const config = require('./config');
const server = require('./server');
const logger = require('./logger');

server.listen(config.server.port, () => {
    logger.log(`Server is listening to the port ${config.server.port}`)
})