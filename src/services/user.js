const joi = require('joi')
const logger = require('./../logger');
const user = require('./../db/models/user')
const crypto = require('crypto');
const config = require('../config');

const validateUserData = (data) => {
    const schema = joi.object({
        userName: joi.string(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        mobileNumber: joi.string().required()
    });
    return schema.validate(data);
}
async function create(data) {
    var response = {};
    logger.log(`Validating the user data - ${JSON.stringify(data)}`)
    const { error } = validateUserData(data);
    if (error) {
        response.status = false;
        response.message = error.details[0].message
        logger.log(`Error is loginData - ${JSON.stringify(response)}`)
        return response;
    }
    const newUser = new user(data);
    newUser.password = crypto.createHmac('sha512', config.auth.secret).update(newUser.password).digest('hex');
    await newUser.save();
    response.user = newUser;
    return response;
}

module.exports = { create }