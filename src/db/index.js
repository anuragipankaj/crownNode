const user = require('./models/user');
const logger = require('./../logger');
const { sequelize } = require('./connection');

sequelize.sync().then(() => {
    logger.log("Models are created")
}).catch((err) => {
    logger.log(`Error while creating the models - ${err}`)
})