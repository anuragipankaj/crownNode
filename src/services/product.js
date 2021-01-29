const Product = require('../db/models/product');
const joi = require('joi')
const logger = require('./../logger');


const validateProductData = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        make: joi.number().required(),
        description: joi.string()
    });
    return schema.validate(data);
}

async function getAll() {
    return await Product.findAll();
}

async function add(data) {
    const { error } = validateProductData(data);
    if (error) {
        logger.log(`Error in product data - ${JSON.stringify(error.message)}`)
        throw new Error(`Data invalid - ${error.message}`);
    }
    var newObj = new Product(data);
    await newObj.save();
    return newObj;
}
module.exports = { getAll, add }