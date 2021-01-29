const joi = require('joi');

const envVarSchema = joi.object({
    CACHE_DURATION: joi.number().default(5),
}).unknown().required();

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error ${error.message}`)
}

const config = {
    cache: {
        duration: envVars.CACHE_DURATION
    },
}
module.exports = config;