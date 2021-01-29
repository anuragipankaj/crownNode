const logger = require('../../logger');
const productService = require('../../services/product');

async function getAll(req, res, next) {
    logger.log("GET ALL PRODUCT");
    var result = {};
    try {
        result.payload = await productService.getAll()
        result.status = true;
        result.message = 'ok'
    } catch (e) {
        result.payload = []
        result.status = `exceptiom occured! - ${e.message}`;
    }
    res.json(result);
}
module.exports = getAll