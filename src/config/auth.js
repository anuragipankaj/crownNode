const joi = require('joi');

const envVarSchema = joi.object({
    HASH_SECRET: joi.string().default("fun123"),
}).unknown().required();

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error ${error.message}`)
}

const config = {
    auth: {
        secret: envVars.HASH_SECRET
    },
}
module.exports = config;