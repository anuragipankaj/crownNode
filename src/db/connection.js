const { Sequelize, DataTypes } = require('sequelize');
const config = require('./../config');
const logger = require('./../logger');
const connection = `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}`
const databaseConnection = `${connection}/${config.db.name}`

var sequelize = new Sequelize(connection, {
    logging: true,
    omitNull: true,
});

sequelize = new Sequelize(databaseConnection, {
    logging: true,
    omitNull: true,
});
sequelize.authenticate().then(() => {
    logger.log("Database connection is sucessfull!")
}).catch((err) => {
    logger.log(`Error while connecting the database - ${err}`);
});

module.exports.sequelize = sequelize;
module.exports.DataTypes = DataTypes
