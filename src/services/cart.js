const Cart = require('../db/models/cart');
const joi = require('joi')
const logger = require('./../logger');


const validateCartData = (data) => {
    const schema = joi.object({
        productId: joi.string().required(),
        userId: joi.string().required(),
        productQuantity: joi.number().required(),
    });
    return schema.validate(data);
}

async function get(_userId) {
    return await Cart.findAll({
        where: {
            userId: _userId
        }
    });
}

async function addToCart(data) {
    const { error } = validateCartData(data);
    if (error) {
        logger.log(`Error is cart data - ${JSON.stringify(error.message)}`)
        throw new Error(`Data invalid - ${error.message}`);
    }
    var oldObj = await Cart.findOne({
        where: {
            userId: data.userId,
            productId: data.productId,
        }
    });
    logger.log(`OldObj - ${JSON.stringify(oldObj)}`)
    if (oldObj) {
        oldObj.productQuantity = parseInt(oldObj.productQuantity) + 1;
    }
    else {
        oldObj = new Cart({
            userId: data.userId,
            productId: data.productId,
            productQuantity: data.productQuantity,
        })
    }

    await oldObj.save();
    return oldObj;
}

module.exports = { get, addToCart }