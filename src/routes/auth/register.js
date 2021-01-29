const logger = require('./../../logger');
const joi = require('joi');
const cache = require('../../cache');
const userService = require('././../../services/user')

async function register(req, res, next) {
    logger.log(`API-REGISTER ${JSON.stringify(req.body)}`);
    try {
        var data = await userService.create(req.body);
        res.json(data)
    } catch (e) {
        res.json({
            status: false,
            message: e.message
        })
    }
}
module.exports = register