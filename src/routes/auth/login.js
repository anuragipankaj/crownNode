const logger = require('./../../logger');
const joi = require('joi');
const cache = require('../../cache');
const authService = require('././../../services/auth')

async function login(req, res, next) {
    logger.log(`API-LOGIN ${JSON.stringify(req.body)}`);
    try {
        var data = await authService.login(req.cache, req.body);
        logger.log(`API-LOGIN-RESPONSE ${JSON.stringify(data)}`);
        res.json(data)
    } catch (e) {
        logger.log(`API-LOGIN-ERROR ${JSON.stringify(e.message)}`);
        res.send({
            status: false,
            message: e.message
        })
    }

}
module.exports = login