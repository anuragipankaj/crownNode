const joi = require('joi');
const logger = require('./../logger');
const envVarSchema = joi
    .object({
        DB_HOST: joi.string().trim().required(),
        DB_PORT: joi.string().trim().default(3306),
        DB_NAME: joi.string().trim().required(),
        DB_USER: joi.string().trim().required(),
        DB_PASSWORD: joi.string().trim().required()
    }).unknown().required();

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error ${error.message}`)
}
const config = {
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        user: envVars.DB_USER,
        name: envVars.DB_NAME,
        password: envVars.DB_PASSWORD
    }
};

module.exports = config;