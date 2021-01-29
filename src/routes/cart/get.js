const cart = require('../../db/models/cart');
const logger = require('../../logger');
const cartService = require('./../../services/cart');

async function get(req, res, next) {
    logger.log("GET CART");
    var result = {};
    try {
        var userId = req.user.id;
        if (userId) {
            result.payload = await cartService.get(userId)
            result.status = 'ok';
        }
        else {
            result.payload = []
            result.status = 'user not found!';
        }
    } catch (e) {
        result.payload = []
        result.status = `exceptiom occured! - ${e.message}`;
    }
    res.json(result);
}
module.exports = get