const joi = require('joi');

const envVarSchema = joi.object({
    PORT: joi.number().port().default(5000),
}).unknown().required();

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error ${error.message}`)
}

const config = {
    server: {
        port: envVars.PORT
    },
}
module.exports = config;