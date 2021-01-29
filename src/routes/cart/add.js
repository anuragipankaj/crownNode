const cart = require('../../db/models/cart');
const logger = require('../../logger');
const cartService = require('./../../services/cart');

async function add(req, res, next) {
    logger.log("GET ADD");
    var result = {};
    try {
        logger.log(req.user);
        req.body.userId = req.user.id;
        result.payload = await cartService.addToCart(req.body);
        result.status = true;
        result.message = 'ok';
    } catch (e) {
        result.status = false;
        result.message = `exceptiom occured! - ${e.message}`;
    }
    res.json(result);
}
module.exports = add