const logger = require('../../logger');
const productService = require('../../services/product');

async function add(req, res, next) {
    logger.log("GET ADD PRODUCT");
    var result = {};
    try {
        result.payload = await productService.add(req.body);
        result.status = true;
        result.message = 'ok';
    } catch (e) {
        result.status = false;
        result.message = `exceptiom occured! - ${e.message}`;
    }
    res.json(result);
}
module.exports = add